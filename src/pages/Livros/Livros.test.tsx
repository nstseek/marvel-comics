import React from 'react';
import { shallow } from 'enzyme';
import Livros from './Livros';
import { Provider } from 'react-redux';
import { store } from 'configureStore';

describe('<Livros />', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <Provider store={store}>
        <Livros />
      </Provider>
    );
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
