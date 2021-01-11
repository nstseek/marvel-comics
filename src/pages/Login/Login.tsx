import { Form, useForm } from '@nstseek/react-forms';
import { FormBuilder } from '@nstseek/react-forms/hooks/form';
import {
  required,
  minLength,
  maxLength,
  checkValidity
} from '@nstseek/react-forms/validators';
import LoginContext, { loginKey } from 'contexts/loginContext';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Routes from 'routes';
import createAlert from 'utils/modal-alert';
import './Login.scss';

interface Login {
  username: string;
  password: string;
}

const formLoginConfig: FormBuilder<Login> = {
  username: {
    initialValue: '',
    inputOptions: {
      label: 'Usuário:',
      type: 'text',
      placeholder: '',
      hideRequired: true,
      autocomplete: 'username'
    },
    validators: [required('usuário')]
  },
  password: {
    initialValue: '',
    inputOptions: {
      label: 'Senha:',
      type: 'password',
      placeholder: '',
      hideRequired: true,
      autocomplete: 'current-password'
    },
    validators: [
      required('senha'),
      minLength('senha', 6),
      maxLength('senha', 18)
    ]
  }
};

const Login: React.FC = () => {
  const formLogin = useForm(formLoginConfig);
  const { setLoggedIn } = useContext(LoginContext);
  const history = useHistory();

  const logIn = () => {
    if (!checkValidity(formLogin, createAlert)) {
      return;
    } else {
      sessionStorage.setItem(loginKey, 'logged');
      setLoggedIn(true);
      history.push(Routes.Livros);
    }
  };

  return (
    <div className='Login'>
      <h3 className='title'>Fazer login</h3>
      <div className='form'>
        <Form form={formLogin} onEnter={logIn} />
      </div>
      <button className='primary' onClick={logIn}>
        Entrar
      </button>
    </div>
  );
};

export default Login;
