import { ModalBase } from '@nstseek/react-forms/validators';

const createAlert = (modal: ModalBase) => {
  alert(`${modal.title}: ${modal.desc}`);
};

export default createAlert;
