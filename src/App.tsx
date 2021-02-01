import React, { useState } from 'react';
import Particles, { IParticlesParams } from 'react-particles-js';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Routes from 'routes';
import './App.scss';
import Login from 'pages/Login/Login';
import Dragoes from 'pages/Dragoes/Dragoes';
import LoginContext, { loginKey } from 'contexts/loginContext';
import Cadastro from 'pages/Cadastro/Cadastro';
import { ReactUIContext, useRootContext } from '@nstseek/react-ui/context';
import { ModalWarning, Loading } from '@nstseek/react-ui/components';
import DragoesContext from 'contexts/dragoesContext';
import { Dragao } from 'typings/api';

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
  const uiRootCtx = useRootContext();
  const [dragoes, setDragoes] = useState<Dragao[]>([]);

  return (
    <DragoesContext.Provider value={{ dragoes, setDragoes }}>
      <ReactUIContext.Provider value={uiRootCtx}>
        <ModalWarning />
        <Loading />
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
              <Route path={Routes.Login}>
                <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
                  <Login />
                </LoginContext.Provider>
              </Route>
              {!loggedIn ? <Redirect to={Routes.Login} /> : null}
              <Route path={Routes.Dragoes}>
                <Dragoes />
              </Route>
              <Route path={Routes.Cadastro + '/:id'}>
                <Cadastro />
              </Route>
              <Route path={Routes.Cadastro}>
                <Cadastro />
              </Route>
              <Redirect to={Routes.Dragoes} />
            </Switch>
          </div>
        </div>
      </ReactUIContext.Provider>
    </DragoesContext.Provider>
  );
};

export default App;
