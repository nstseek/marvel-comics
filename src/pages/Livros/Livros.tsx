import { AppState } from 'configureStore';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Livro as LivroModel } from 'reducers/livros';
import Routes from 'routes';
import Livro from './components/Livro/Livro';
import './Livros.scss';

interface Props {
  livros: LivroModel[];
}

export const Livros: React.FC<Props> = (props) => {
  const history = useHistory();

  return (
    <div className='Livros'>
      <div className='options'>
        <button
          className='primary'
          id='livros-add'
          onClick={() => history.push(Routes.Cadastro)}>
          <i className='fas fa-plus'></i> Adicionar um livro
        </button>
      </div>
      {props.livros.map((livro) => (
        <Livro livro={{ ...livro }} key={livro.id} />
      ))}
    </div>
  );
};

const mapStateToProps = ({ biblioteca }: AppState) => ({
  livros: biblioteca.livros
});

export default connect(mapStateToProps)(Livros);
