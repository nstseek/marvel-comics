import { ReactUIContext } from '@nstseek/react-ui/context';
import DragoesContext from 'contexts/dragoesContext';
import _ from 'lodash';
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Routes from 'routes';
import { Dragao as DragaoModel } from 'typings/api';
import API from 'utils/api';
import Dragao from './components/Dragao/Dragao';
import './Dragoes.scss';

export const Dragoes: React.FC = () => {
  const history = useHistory();
  const { dragoes, setDragoes } = useContext(DragoesContext);
  const uiCtx = useContext(ReactUIContext);

  const fetchDragoes = async () => {
    try {
      uiCtx.pushLoading();
      const response = await API.get<DragaoModel[]>('');
      const newDragoes = _.sortBy(response.data, ['name', 'type']);
      setDragoes(newDragoes);
    } catch (err) {
      uiCtx.addModal({
        desc: 'Erro ao buscar os dragões. Entre em contato com o suporte.',
        title: 'Erro no serviço',
        type: 'error'
      });
    } finally {
      uiCtx.popLoading();
    }
  };

  useEffect(() => {
    fetchDragoes();
  }, []);

  return (
    <div className='Dragoes'>
      <div className='options'>
        <button
          className='primary'
          id='dragao-add'
          onClick={() => history.push(Routes.Cadastro)}>
          <i className='fas fa-plus'></i> Adicionar um dragão
        </button>
      </div>
      {dragoes.map((dragao) => (
        <Dragao refreshList={fetchDragoes} dragao={dragao} key={dragao.id} />
      ))}
    </div>
  );
};

export default Dragoes;
