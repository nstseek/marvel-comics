import React from 'react';
import { shallow } from 'enzyme';
import Livros from './Livros';

describe('<Livros />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Livros />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
