import { Form, useForm } from '@nstseek/react-forms';
import { FormBuilder } from '@nstseek/react-forms/hooks/form';
import { checkValidity, required } from '@nstseek/react-forms/validators';
import { AppState } from 'configureStore';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Livro, LivroBase } from 'reducers/livros';
import { createLivro, updateLivro } from 'reducers/livros/livros.actions';
import Routes from 'routes';
import createAlert from 'utils/modal-alert';
import './Cadastro.scss';

interface Props {
  livros: Livro[];
  updateLivro(data: Livro);
  createLivro(data: LivroBase);
}

const formLivroConfig: FormBuilder<Omit<LivroBase, 'alugado'>> = {
  titulo: {
    initialValue: '',
    validators: [required('título')],
    inputOptions: {
      label: 'Título',
      type: 'text',
      placeholder: 'Digite aqui o título do livro'
    }
  },
  autor: {
    initialValue: '',
    validators: [required('autor')],
    inputOptions: {
      label: 'Autor',
      type: 'text',
      placeholder: 'Digite aqui o autor do livro'
    }
  },
  anoLancamento: {
    initialValue: '',
    validators: [required('ano de lançamento')],
    inputOptions: {
      label: 'Ano de lançamento',
      type: 'text',
      mask: '9999',
      placeholder: 'Digite aqui o ano de lançamento do livro'
    }
  }
};

const Cadastro: React.FC<Props> = (props) => {
  const formLivro = useForm(formLivroConfig);
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const livro = id
    ? props.livros.find((livro) => livro.id === Number(id))
    : null;

  useEffect(() => {
    if (livro && formLivro.state) {
      formLivro.patchValue(livro);
    }
  }, []);

  const saveLivro = () => {
    if (!checkValidity(formLivro, createAlert)) {
      return;
    }
    if (livro) {
      props.updateLivro({
        ...livro,
        ...formLivro.value
      });
    } else {
      props.createLivro({
        ...formLivro.value,
        alugado: false
      });
    }

    history.push(Routes.Livros);
  };
  return (
    <div className='Cadastro'>
      <h3 className='title'>{id ? 'Editar' : 'Cadastrar'} livro</h3>
      <div className='form'>
        <Form form={formLivro} onEnter={saveLivro} />
      </div>
      <div className='options'>
        <button className='primary' onClick={saveLivro}>
          <i className='fas fa-save'></i>
          Salvar
        </button>
        <button className='primary' onClick={() => history.push(Routes.Livros)}>
          <i className='fas fa-times'></i>
          Cancelar
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ biblioteca }: AppState) => ({
  livros: biblioteca.livros
});

const mapDispatchToProps = (dispatch) => ({
  createLivro: (data: LivroBase) => dispatch(createLivro(data)),
  updateLivro: (data: Livro) => dispatch(updateLivro(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cadastro);
