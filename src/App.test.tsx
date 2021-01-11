jest.mock('react-router-dom', () => ({
  useHistory: () => ({ push: mockPush }),
  Route: () => '',
  Redirect: () => '',
  Switch: () => ''
}));

const mockPush = jest.fn();

jest.mock('react-particles-js', () => () => '');

import React from 'react';
import { mount } from 'enzyme';
import App from './App';
import Routes from 'routes';
import { loginKey } from 'contexts/loginContext';

describe('<App />', () => {
  let component: ReturnType<typeof mount>;

  beforeEach(() => {
    component = mount(<App />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });

  test('It should navigate to login when logging out', () => {
    sessionStorage.setItem(loginKey, 'logged');
    component = mount(<App />);
    component.find('span.logout').simulate('click');
    expect(mockPush).toHaveBeenCalledWith(Routes.Login);
  });

  test('It shouldnt have the logout without being logged in', () => {
    expect(component.find('span.logout').length).toEqual(0);
  });
});
