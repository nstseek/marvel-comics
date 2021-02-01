import React from 'react';
import { mount } from 'enzyme';
import { Cadastro } from './Cadastro';
import { BrowserRouter } from 'react-router-dom';

describe('<Cadastro />', () => {
  let component: ReturnType<typeof mount>;

  beforeEach(() => {
    component = mount(
      <BrowserRouter>
        <Cadastro />
      </BrowserRouter>
    );
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
