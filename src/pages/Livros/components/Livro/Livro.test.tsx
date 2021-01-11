import React from 'react';
import { shallow } from 'enzyme';
import Livro from './Livro';
import { Provider } from 'react-redux';
import { store } from 'configureStore';

describe('<Livro />', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <Provider store={store}>
        <Livro
          livro={{
            id: 1,
            alugado: false,
            anoLancamento: 2005,
            autor: 'J. K. Rowling',
            titulo: 'Harry Potter e o Enigma do Príncipe'
          }}
        />
      </Provider>
    );
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
