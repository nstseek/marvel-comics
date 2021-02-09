import React from 'react';
import { shallow } from 'enzyme';
import Loading from './Loading';
import { ReactUIContext } from '@nstseek/react-ui/context';

describe('<Loading />', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <ReactUIContext.Provider value={null}>
        <Loading />
      </ReactUIContext.Provider>
    );
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
