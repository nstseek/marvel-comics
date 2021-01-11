import React from 'react';
import { shallow } from 'enzyme';
import Livro from './Livro';

describe('<Livro />', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <Livro
        livro={{
          id: 1,
          alugado: false,
          anoLancamento: 2005,
          autor: 'J. K. Rowling',
          titulo: 'Harry Potter e o Enigma do Príncipe'
        }}
      />
    );
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
