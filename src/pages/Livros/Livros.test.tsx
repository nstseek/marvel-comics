jest.mock('react-router-dom', () => ({
  useHistory: () => ({ push: mockPush })
}));

const mockPush = jest.fn();

import React from 'react';
import { mount } from 'enzyme';
import { Livros } from './Livros';
import Routes from 'routes';
import { Livro } from 'reducers/livros';
import { Provider } from 'react-redux';
import { store } from 'configureStore';

const livro: Livro = {
  alugado: true,
  anoLancamento: 2018,
  autor: 'João',
  id: 1,
  titulo: 'João e Maria'
};

describe('<Livros />', () => {
  let component: ReturnType<typeof mount>;

  beforeEach(() => {
    component = mount(
      <Provider store={store}>
        <Livros livros={[livro]} />
      </Provider>
    );
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });

  test('It should navigate to cadastro when clicking the new button', () => {
    component.find('button#livros-add').simulate('click');
    expect(mockPush).toHaveBeenCalledWith(Routes.Cadastro);
  });

  test('It should have one single Livro child', () => {
    expect(component.find('div.Livro').length).toEqual(1);
  });
});
