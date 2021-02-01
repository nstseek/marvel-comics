import { Form, useForm } from '@nstseek/react-forms';
import { FormBuilder } from '@nstseek/react-forms/hooks/form';
import {
  required,
  minLength,
  maxLength,
  checkValidity
} from '@nstseek/react-forms/validators';
import { ReactUIContext } from '@nstseek/react-ui/context';
import LoginContext, { loginKey } from 'contexts/loginContext';
import React, { useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import Routes from 'routes';
import './Login.scss';

interface Login {
  username: string;
  password: string;
}

export const formLoginConfig: FormBuilder<Login> = {
  username: {
    initialValue: '',
    inputOptions: {
      id: 'user',
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
      id: 'password',
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

const loginObj = {
  login: 'teste@sicredi.com.br',
  senha: 'Sicredi@2021'
};

const Login: React.FC = () => {
  const formLogin = useForm(formLoginConfig);
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  const history = useHistory();
  const uiCtx = useContext(ReactUIContext);

  const logIn = () => {
    if (!checkValidity(formLogin, uiCtx.addModal)) {
      return;
    }
    if (
      formLogin.value.password !== loginObj.senha ||
      formLogin.value.username !== loginObj.login
    ) {
      uiCtx.addModal({
        desc:
          'Usuário ou senha incorretos. (Dica: o usuário é teste@sicredi.com.br e a senha é Sicredi@2021)',
        title: 'Erro ao fazer login',
        type: 'error'
      });
      return;
    }
    sessionStorage.setItem(loginKey, 'logged');
    setLoggedIn(true);
    history.push(Routes.Dragoes);
  };

  return loggedIn ? (
    <Redirect to={Routes.Dragoes} />
  ) : (
    <div className='Login'>
      <h3 className='title'>Fazer login</h3>
      <div className='form'>
        <Form form={formLogin} onEnter={logIn} />
      </div>
      <button id='log-in' className='primary' onClick={logIn}>
        Entrar
      </button>
    </div>
  );
};

export default Login;
