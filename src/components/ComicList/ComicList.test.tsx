import React from 'react';
import { shallow } from 'enzyme';
import ComicList from './ComicList';

describe('<ComicList />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<ComicList />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
