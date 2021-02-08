import { Backdrop } from '@nstseek/react-ui/components';
import React from 'react';
import { Comic } from 'typings/api';
import {
  getCharacters,
  getCreators,
  getDetails,
  getPublishDate
} from 'utils/comic-utils';
import './ComicDetails.scss';

interface Props {
  comic: Comic;
  close();
}

const Field = (label, content) => (
  <p className='field'>
    <span className='title'>{label}</span>
    {content}
  </p>
);

const ComicDetails: React.FC<Props> = ({ comic, close }) => (
  <Backdrop onBackdropClick={close}>
    <div className='ComicDetails'>
      <div className='comic-content'>
        <img src={comic.thumbnail.path + '.' + comic.thumbnail.extension}></img>
        <h3 className='comic-title'>{comic.title}</h3>
        {Field('Criadores: ', getCreators(comic))}
        {comic.description ? Field('Descrição: ', comic.description) : null}
        {getCharacters(comic)
          ? Field('Personagens: ', getCharacters(comic))
          : null}
        {Field(
          'Preço: ',
          comic.prices?.[0]?.price.toLocaleString('pt-br') + ' dólares'
        )}
        {Field('Série: ', comic.series.name)}
        {Field('Data de publicação: ', getPublishDate(comic))}
        {getDetails(comic) ? (
          <a target='_blank' rel='noreferrer' href={getDetails(comic)}>
            Clique aqui para ver mais detalhes
          </a>
        ) : null}
      </div>
      <button className='close-details' onClick={close}>
        Fechar
      </button>
    </div>
  </Backdrop>
);

export default ComicDetails;
