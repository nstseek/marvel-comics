import { Form, useForm } from '@nstseek/react-forms';
import { FormBuilder } from '@nstseek/react-forms/hooks/form';
import { checkValidity, required } from '@nstseek/react-forms/validators';
import { ReactUIContext } from '@nstseek/react-ui/context';
import DragoesContext from 'contexts/dragoesContext';
import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Routes from 'routes';
import { DragaoBase } from 'typings/api';
import API from 'utils/api';
import './Cadastro.scss';

export const formDragaoConfig: FormBuilder<DragaoBase> = {
  name: {
    initialValue: '',
    validators: [required('nome')],
    inputOptions: {
      label: 'Nome:',
      type: 'text',
      placeholder: 'Digite aqui o nome do dragão'
    }
  },
  type: {
    initialValue: '',
    validators: [required('tipo')],
    inputOptions: {
      label: 'Tipo:',
      type: 'text',
      placeholder: 'Digite aqui o tipo do dragão'
    }
  }
};

export const Cadastro: React.FC = () => {
  const formDragao = useForm(formDragaoConfig);
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const uiCtx = useContext(ReactUIContext);
  const { dragoes } = useContext(DragoesContext);
  const dragao = id ? dragoes.find((dragao) => dragao.id === id) : null;

  useEffect(() => {
    if (dragao && formDragao.state) {
      formDragao.patchValue(dragao);
    }
  }, []);

  const saveDragao = async () => {
    if (!checkValidity(formDragao, uiCtx.addModal)) {
      return;
    }

    try {
      uiCtx.pushLoading();
      if (dragao) {
        await API.put(`/${id}`, formDragao.value);
      } else {
        await API.post('', formDragao.value);
      }
    } catch (err) {
      uiCtx.addModal({
        desc: 'Erro ao salvar o dragão. Entre em contato com o suporte.',
        title: 'Erro no serviço',
        type: 'error'
      });
    } finally {
      uiCtx.popLoading();
    }

    history.push(Routes.Dragoes);
  };
  return (
    <div className='Cadastro'>
      <h3 className='title'>{id ? 'Editar' : 'Cadastrar'} dragão</h3>
      <div className='form'>
        <Form form={formDragao} onEnter={saveDragao} />
      </div>
      <div className='options'>
        <button className='primary' id='save-dragao' onClick={saveDragao}>
          <i className='fas fa-save'></i>
          Salvar
        </button>
        <button
          className='primary'
          id='cancel-dragao'
          onClick={() => history.push(Routes.Dragoes)}>
          <i className='fas fa-times'></i>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default Cadastro;
