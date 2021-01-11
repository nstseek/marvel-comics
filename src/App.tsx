import React, { useState } from 'react';
import Particles, { IParticlesParams } from 'react-particles-js';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Routes from 'routes';
import './App.scss';
import Login from 'pages/Login/Login';
import Livros from 'pages/Livros/Livros';
import LoginContext, { loginKey } from 'contexts/loginContext';
import Cadastro from 'pages/Cadastro/Cadastro';

const particlesParam: IParticlesParams = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: false,
        value_area: 800
      }
    },
    opacity: {
      value: 0.5,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 1,
      random: true,
      anim: {
        enable: false,
        speed: 10,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: false
    },
    move: {
      enable: true,
      speed: 1,
      direction: 'none',
      random: true
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'repulse'
      },
      onclick: {
        enable: true,
        mode: 'push'
      },
      resize: true
    },
    modes: {
      repulse: {
        distance: 50,
        duration: 1
      },
      push: {
        particles_nb: 1,
        quantity: 5
      }
    }
  },
  retina_detect: true
};

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(!!sessionStorage.getItem(loginKey));
  const history = useHistory();
  return (
    <div className='App'>
      <Particles className='particles' params={particlesParam} />
      {loggedIn ? (
        <span
          className='logout'
          onClick={() => {
            sessionStorage.removeItem(loginKey);
            setLoggedIn(false);
            history.push(Routes.Login);
          }}>
          <i className='fas fa-times'></i>
          Sair
        </span>
      ) : null}
      <div className='main-container'>
        <Switch>
          {!loggedIn ? (
            <>
              <Route path={Routes.Login}>
                <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
                  <Login />
                </LoginContext.Provider>
              </Route>
              <Redirect to={Routes.Login} />
            </>
          ) : null}
          <Route path={Routes.Livros}>
            <Livros />
          </Route>
          <Route path={Routes.Cadastro + '/:id'}>
            <Cadastro />
          </Route>
          <Route path={Routes.Cadastro}>
            <Cadastro />
          </Route>
          <Redirect to={Routes.Livros} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
