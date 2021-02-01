import React from 'react';
import { mount } from 'enzyme';
import Dragoes from './Dragoes';

describe('<Dragoes />', () => {
  let component: ReturnType<typeof mount>;

  beforeEach(() => {
    component = mount(<Dragoes />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
