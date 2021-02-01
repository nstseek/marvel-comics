import { ReactUIContext } from '@nstseek/react-ui/context';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Routes from 'routes';
import { Dragao as DragaoModel } from 'typings/api';
import API from 'utils/api';
import './Dragao.scss';

interface Props {
  dragao: DragaoModel;
  refreshList();
}

export const Dragao: React.FC<Props> = (props) => {
  const [details, setDetails] = useState(false);

  const history = useHistory();
  const uiCtx = useContext(ReactUIContext);

  const detailsBaseClass = 'details-dragao-row';
  const detailsDropClass = 'dropdown-active';
  const detailsClass = [detailsBaseClass, details ? detailsDropClass : null]
    .join(' ')
    .trim();

  const iconClass = ['fas fa-angle-down', details ? detailsDropClass : null]
    .join(' ')
    .trim();

  const removerDragao = async () => {
    try {
      uiCtx.pushLoading();
      await API.delete(`/${props.dragao.id}`);
      props.refreshList();
    } catch (err) {
      uiCtx.addModal({
        desc: `Erro ao deletar o dragão ${props.dragao.name}. Entre em contato com o suporte.`,
        title: 'Erro no serviço',
        type: 'error'
      });
    } finally {
      uiCtx.popLoading();
    }
  };

  return (
    <div className='Dragao' onClick={() => setDetails(!details)}>
      <div className='main-dragao-row'>
        <span className='dragao-title'>
          <i className={iconClass}></i>
          {props.dragao.name}
        </span>
        <div className='dragao-options'>
          <button
            id='remover-dragao'
            onClick={(event) => {
              event.stopPropagation();
              removerDragao();
            }}>
            <i className='fas fa-times'></i>
            Remover
          </button>
          <button
            id='editar-dragao'
            onClick={(event) => {
              event.stopPropagation();
              history.push(Routes.Cadastro + '/' + props.dragao.id);
            }}>
            <i className='fas fa-edit'></i>
            Editar
          </button>
        </div>
      </div>
      <div className={detailsClass}>
        <span className='detail'>
          <span className='detail-title'>Tipo:</span> {props.dragao.type}
        </span>
      </div>
    </div>
  );
};

export default Dragao;
