jest.mock('react-particles-js', () => () => '');

import React from 'react';
import { mount } from 'enzyme';
import App from './App';

describe('<App />', () => {
  let component: ReturnType<typeof mount>;

  beforeEach(() => {
    component = mount(<App />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
