import React from 'react';
import { mount } from 'enzyme';
import { Livro } from './Livro';
import { Provider } from 'react-redux';
import { store } from 'configureStore';

const mocks = {
  alugarLivro: jest.fn(),
  devolverLivro: jest.fn(),
  removerLivro: jest.fn(),
  push: jest.fn(),
  livroAlugado: {
    id: 1,
    alugado: true,
    anoLancamento: 2005,
    autor: 'J. K. Rowling',
    titulo: 'Harry Potter e o Enigma do Príncipe'
  },
  livro: {
    id: 1,
    alugado: false,
    anoLancamento: 2005,
    autor: 'J. K. Rowling',
    titulo: 'Harry Potter e o Enigma do Príncipe'
  }
};

jest.mock('react-router-dom', () => ({
  useHistory: () => ({ push: mocks.push })
}));

describe('<Livro />', () => {
  let component: ReturnType<typeof mount>;

  beforeEach(() => {
    component = mount(
      <Provider store={store}>
        <Livro {...mocks} />
      </Provider>
    );
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });

  test('It should call removerLivro when clicking in the remove button', () => {
    component.find('button#remover-livro').simulate('click');
    expect(mocks.removerLivro).toHaveBeenCalledWith(mocks.livro.id);
  });

  test('It should call alugarLivro when clicking in a available book', () => {
    component.find('button#alugar-livro').simulate('click');
    expect(mocks.alugarLivro).toHaveBeenCalledWith(mocks.livro.id);
  });

  test('It should call alugarLivro when clicking in a unavailable book', () => {
    component = mount(
      <Provider store={store}>
        <Livro {...mocks} livro={mocks.livroAlugado} />
      </Provider>
    );
    component.find('button#alugar-livro').simulate('click');
    expect(mocks.devolverLivro).toHaveBeenCalledWith(mocks.livroAlugado.id);
  });
});
