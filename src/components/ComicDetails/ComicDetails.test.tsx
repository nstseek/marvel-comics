import React from 'react';
import { shallow } from 'enzyme';
import ComicDetails from './ComicDetails';

describe('<ComicDetails />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<ComicDetails />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
