import React from 'react';
import { shallow } from 'enzyme';
import Cadastro from './Cadastro';

describe('<Cadastro />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Cadastro />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
