import React from 'react';
import { shallow } from 'enzyme';
import Comic from './Comic';

describe('<Comic />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Comic />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
