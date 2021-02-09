import React from 'react';
import { shallow } from 'enzyme';
import ComicList from './ComicList';
import { ReactUIContext } from '@nstseek/react-ui/context';

describe('<ComicList />', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <ReactUIContext.Provider value={null}>
        <ComicList />
      </ReactUIContext.Provider>
    );
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
