jest.mock('react-router-dom', () => ({
  useHistory: () => ({ push: mockPush }),
  useParams: () => ({ id: mockId })
}));

const mockPush = jest.fn();

jest.mock('@nstseek/react-forms/validators', () => ({
  required: () => jest.fn(),
  maxLength: () => jest.fn(),
  minLength: () => jest.fn(),
  checkValidity: (...args) => {
    mockCheckValidity(...args);
    return true;
  }
}));

const mockCheckValidity = jest.fn();

jest.mock('@nstseek/react-forms', () => ({
  useForm: (config) => {
    mockUseForm(config);
    return testForm;
  },
  Form: () => formTestStr
}));

const testForm: Livro = {
  alugado: true,
  anoLancamento: 2020,
  autor: 'a',
  id: 1,
  titulo: 'b'
};

const mockUseForm = jest.fn();

const formTestStr = 'form test';

let mockId = null;

import React from 'react';
import { mount } from 'enzyme';
import { Cadastro, formLivroConfig } from './Cadastro';
import { Provider } from 'react-redux';
import { store } from 'configureStore';
import Routes from 'routes';
import { Livro } from 'reducers/livros';
import createAlert from 'utils/modal-alert';

const mocks = {
  updateLivro: jest.fn(),
  createLivro: jest.fn(),
  livros: [
    {
      alugado: true,
      anoLancamento: 2018,
      autor: 'João',
      id: 1,
      titulo: 'João e Maria'
    }
  ]
};

describe('<Cadastro />', () => {
  let component: ReturnType<typeof mount>;

  beforeEach(() => {
    component = mount(<Cadastro {...mocks} />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });

  test('It should redirect to Livros when cancelling', () => {
    component.find('button#cancel-livro').simulate('click');
    expect(mockPush).toHaveBeenCalledWith(Routes.Livros);
  });

  test('It should use Editar when id is present', () => {
    mockId = 2;
    component = mount(<Cadastro {...mocks} />);
    expect(component.find('h3.title').text()).toContain('Editar');
    expect(component.find('h3.title').text()).not.toContain('Cadastrar');
  });

  test('It should use Cadastrar when id is not present', () => {
    mockId = null;
    component = mount(<Cadastro {...mocks} />);
    expect(component.find('h3.title').text()).not.toContain('Editar');
    expect(component.find('h3.title').text()).toContain('Cadastrar');
  });

  test('It should have rendered Form component', () => {
    expect(component.html().indexOf(formTestStr)).toBeGreaterThan(-1);
  });

  test('It should check for validity when clicking the enter button', () => {
    component.find('button#save-livro').simulate('click');
    expect(mockCheckValidity).toHaveBeenCalledWith(testForm, createAlert);
  });

  test('It should build the form with the right configs', () => {
    expect(mockUseForm).toHaveBeenCalledWith(formLivroConfig);
  });

  test('It should navigate to Livros after creating an entry', () => {
    component.find('button#save-livro').simulate('click');
    expect(mockPush).toHaveBeenCalledWith(Routes.Livros);
  });

  test('It should call updateLivro when id is available', () => {
    mockId = mocks.livros[0].id;
    component = mount(<Cadastro {...mocks} />);
    component.find('button#save-livro').simulate('click');
    expect(mocks.updateLivro).toHaveBeenCalled();
  });

  test('It should call updateLivro when id is available', () => {
    mockId = null;
    component = mount(<Cadastro {...mocks} />);
    component.find('button#save-livro').simulate('click');
    expect(mocks.createLivro).toHaveBeenCalled();
  });
});
