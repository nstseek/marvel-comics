import React from 'react';
import { shallow } from 'enzyme';
import Comic from './Comic';

describe('<Comic />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Comic comic={{thumbnail: {}} as any} addComic={() => null} removeComic={() => null} />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
