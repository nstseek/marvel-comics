import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Livro as LivroModel } from 'reducers/livros';
import {
  alugarLivro,
  devolverLivro,
  removeLivro
} from 'reducers/livros/livros.actions';
import Routes from 'routes';
import './Livro.scss';

interface Props {
  alugarLivro(id: number);
  devolverLivro(id: number);
  removerLivro(id: number);
  livro: LivroModel;
}

const Livro: React.FC<Props> = (props) => {
  const [details, setDetails] = useState(false);

  const history = useHistory();

  const detailsBaseClass = 'details-livro-row';
  const detailsDropClass = 'dropdown-active';
  const detailsClass = [detailsBaseClass, details ? detailsDropClass : null]
    .join(' ')
    .trim();

  const iconClass = ['fas fa-angle-up', details ? detailsDropClass : null]
    .join(' ')
    .trim();

  return (
    <div className='Livro'>
      <div className='main-livro-row' onClick={() => setDetails(!details)}>
        <span className='livro-title'>
          <i className={iconClass}></i>
          {props.livro.titulo}
        </span>
        <div className='livro-options'>
          <button
            className='primary'
            onClick={(event) => {
              event.stopPropagation();
              props.livro.alugado
                ? props.devolverLivro(props.livro.id)
                : props.alugarLivro(props.livro.id);
            }}>
            {props.livro.alugado ? (
              <>
                <i className='fas fa-upload'></i>
                Devolver
              </>
            ) : (
              <>
                <i className='fas fa-download'></i>
                Alugar
              </>
            )}
          </button>
          <button
            disabled={props.livro.alugado}
            onClick={() => props.removerLivro(props.livro.id)}>
            <i className='fas fa-times'></i>
            Remover
          </button>
          <button
            disabled={props.livro.alugado}
            onClick={() =>
              history.push(Routes.Cadastro + '/' + props.livro.id)
            }>
            <i className='fas fa-edit'></i>
            Editar
          </button>
        </div>
      </div>
      <div className={detailsClass}>
        <span className='detail'>
          <span className='detail-title'>Ano de lançamento:</span>{' '}
          {props.livro.anoLancamento}
        </span>
        <span className='detail'>
          <span className='detail-title'>Alugado:</span>{' '}
          {props.livro.alugado ? 'Sim' : 'Não'}
        </span>
        <span className='detail'>
          <span className='detail-title'>Autor:</span> {props.livro.autor}
        </span>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  alugarLivro: (id: number) => dispatch(alugarLivro(id)),
  devolverLivro: (id: number) => dispatch(devolverLivro(id)),
  removerLivro: (id: number) => dispatch(removeLivro(id))
});

export default connect(null, mapDispatchToProps)(Livro);
