import React from 'react';
import { shallow } from 'enzyme';
import Cadastro from './Cadastro';
import { Provider } from 'react-redux';
import { store } from 'configureStore';

describe('<Cadastro />', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <Provider store={store}>
        <Cadastro />
      </Provider>
    );
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
