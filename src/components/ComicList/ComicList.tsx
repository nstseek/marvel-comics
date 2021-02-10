import { ReactUIContext } from '@nstseek/react-ui/context';
import axios, { CancelTokenSource } from 'axios';
import Comic from 'components/Comic/Comic';
import ComicDetails from 'components/ComicDetails/ComicDetails';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Comic as ComicModel, ComicParams, ComicResponse } from 'typings/api';
import {
  getThumbnail,
  getCreators,
  getCharacters,
  getDetails,
  getPublishDate
} from 'utils/comic-utils';
import './ComicList.scss';

const cancelMessage = 'Cancelled intentionally';

/**
 * This component holds all the logic to fetch and search for comics
 * It also holds the logic for selecting comics and building an email to be sent by the final user
 */
const ComicList: React.FC = () => {
  const [comics, setComics] = useState<ComicResponse>(null);
  const [query, setQuery] = useState('');
  const [selectedComics, setSelectedComics] = useState<ComicModel[]>([]);
  const [openComic, setOpenComic] = useState<ComicModel>(null);
  const uiCtx = useContext(ReactUIContext);
  const latestFetch = useRef<CancelTokenSource>(null);
  const pageSize = 20;
  const [page, setPage] = useState({ value: 1 });
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    fetchComics();
    return () => latestFetch.current.cancel(cancelMessage);
  }, [page]);

  useEffect(() => {
    setPage({ value: 1 });
  }, [query]);

  const fetchComics = async () => {
    latestFetch.current = axios.CancelToken.source();
    uiCtx.pushLoading();
    try {
      const params: ComicParams = {
        apikey: '2039859d947cf31356a41e66a4dcb442',
        format: 'comic',
        formatType: 'comic',
        offset: (page.value - 1) * pageSize,
        limit: pageSize,
        ...(query ? { titleStartsWith: query } : null)
      };
      const response = await axios.get<ComicResponse>(
        'https://gateway.marvel.com/v1/public/comics',
        {
          params,
          cancelToken: latestFetch.current.token
        }
      );
      setComics(response.data);
      setTotalPages(Math.ceil(response.data.data.total / pageSize));
    } catch (err) {
      if (err?.message !== cancelMessage) {
        uiCtx.addModal({
          desc: 'Erro ao atualizar lista de comics',
          title: 'Erro na API',
          type: 'error'
        });
      }
    } finally {
      uiCtx.popLoading();
    }
  };

  const buildEmail = (comic: ComicModel): [string, string] => {
    const subject = 'Comic - ' + comic.title;
    const body = `Título: ${comic.title}\n\nImagem: ${getThumbnail(
      comic
    )}\n\nCriadores: ${getCreators(comic)}${
      comic.description ? '\n\nDescrição: ' + comic.description : ''
    }\n\nPersonagens: ${getCharacters(
      comic
    )}\n\nPreço: ${comic.prices?.[0]?.price.toLocaleString(
      'pt-br'
    )} dólares\n\nSérie: ${comic.series.name}${
      getDetails(comic) ? '\n\nDetalhes: ' + getDetails(comic) : ''
    }${
      getPublishDate(comic)
        ? '\n\nData de publicação: ' + getPublishDate(comic)
        : ''
    }`;
    return [subject, body];
  };

  const sendEmail = () => {
    const emailComics = selectedComics.map(buildEmail);
    const subject = encodeURIComponent(
      emailComics.map(([subject]) => subject).join(' | ')
    );
    const body =
      encodeURIComponent(
        emailComics
          .map(([, body]) => body)
          .join(
            ' \n\n============================================================================\n\n '
          )
      ) + '\n';
    /* 
      Não é possível colocar a imagem diretamente no email usando o protocolo mailto:

      O protocolo mailto: não permite que você defina o MIME type do conteúdo, ele sempre será plain/text.

      Para poder fazer o embed da imagem direto você precisaria definir o MIME type do corpo da mensagem como text/html
      e então utilizar um elemento <img> no corpo da mensagem colocando a URL da imagem no src do elemento.

      Como plain/text, o elemento será considerado como texto normal e você terá um <img> em texto indesejado no corpo do email.

      Sendo assim, coloquei apenas o link para a imagem no email, você pode ler mais a respeito no link abaixo:
      https://stackoverflow.com/questions/35033785/gmail-mailto-with-images-and-links

      Você também pode ler mais sobre MIME types aqui:
      https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
    */
    const aEl: HTMLAnchorElement = document.createElement('a');
    aEl.target = '_blank';
    aEl.href = `mailto:?subject=${subject}&body=${body}&Content-type=text/html`;
    aEl.click();
  };

  return (
    <div className='ComicList'>
      {openComic ? (
        <ComicDetails comic={openComic} close={() => setOpenComic(null)} />
      ) : null}
      <div className='query'>
        <input
          type='text'
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder='Digite um título para pesquisar quadrinhos...'
        />
      </div>
      <div className={'list' + (comics?.data?.count ? ' has-data' : '')}>
        {comics?.data?.count ? (
          <>
            {comics.data.results.map((comic) => (
              <Comic
                key={comic.id}
                comic={comic}
                openComic={(comic) => setOpenComic(comic)}
                selected={
                  selectedComics.findIndex(
                    (selectedComic) => selectedComic.id === comic.id
                  ) >= 0
                }
                addComic={(comic) =>
                  setSelectedComics((previousState) => [
                    ...previousState,
                    comic
                  ])
                }
                removeComic={(id) => {
                  setSelectedComics((previousState) =>
                    previousState.filter((comic) => comic.id !== id)
                  );
                }}
              />
            ))}
          </>
        ) : (
          <h3>
            {uiCtx.state.loading.length
              ? 'Carregando...'
              : 'Nenhum resultado encontrado.'}
          </h3>
        )}
      </div>
      {comics?.data ? (
        <h5 className='result-info'>
          Mostrando de {comics.data.offset + 1} a{' '}
          {comics.data.offset + comics.data.count} de um total de{' '}
          {comics.data.total} - {comics.data.limit} por página - {totalPages}{' '}
          páginas
        </h5>
      ) : null}
      <div className='controls'>
        {comics?.data ? (
          <div className='navigators'>
            <button
              className='page-switcher'
              onClick={() =>
                setPage((previousState) => {
                  if (previousState.value === 1) {
                    return previousState;
                  } else {
                    return { value: previousState.value - 1 };
                  }
                })
              }>
              {'<'}
            </button>
            <button
              className='page-switcher'
              onClick={() =>
                setPage((previousState) => {
                  if (previousState === totalPages) {
                    return previousState;
                  } else {
                    return { value: previousState.value + 1 };
                  }
                })
              }>
              {'>'}
            </button>
          </div>
        ) : null}
        {selectedComics.length ? (
          <div className='mail-buttons'>
            <button onClick={sendEmail}>Enviar email</button>
            <button onClick={() => setSelectedComics([])}>
              Desmarcar todos
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ComicList;
