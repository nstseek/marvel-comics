import React from 'react';
import { shallow } from 'enzyme';
import Loading from './Loading';

describe('<Loading />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Loading />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
