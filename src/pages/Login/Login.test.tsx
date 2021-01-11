jest.mock('@nstseek/react-forms/validators', () => ({
  required: () => jest.fn(),
  maxLength: () => jest.fn(),
  minLength: () => jest.fn(),
  checkValidity: (...args) => {
    mockCheckValidity(...args);
    return true;
  }
}));

const mockCheckValidity = jest.fn();

jest.mock('@nstseek/react-forms', () => ({
  useForm: (config) => {
    mockUseForm(config);
    return testForm;
  },
  Form: () => formTestStr
}));

const testForm: Login = {
  password: 'test123',
  username: 'test@test.com'
};

const mockUseForm = jest.fn();

const formTestStr = 'form test';

jest.mock('react-router-dom', () => ({
  useHistory: () => {
    return { push: mockPush };
  }
}));

const mockPush = jest.fn();

const mockSetItem = jest.fn();

global.sessionStorage.setItem = mockSetItem;

import React from 'react';
import { mount } from 'enzyme';
import Login, { formLoginConfig } from './Login';
import createAlert from 'utils/modal-alert';
import Routes from 'routes';

describe('<Login />', () => {
  let component: ReturnType<typeof mount>;

  beforeEach(() => {
    component = mount(<Login />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });

  test('It should have rendered Form component', () => {
    expect(component.html().indexOf(formTestStr)).toBeGreaterThan(-1);
  });

  test('It should check for validity when clicking the enter button', () => {
    component.find('button#log-in').simulate('click');
    expect(mockCheckValidity).toHaveBeenCalledWith(testForm, createAlert);
  });

  test('It should build the form with the right configs', () => {
    expect(mockUseForm).toHaveBeenCalledWith(formLoginConfig);
  });

  test('It should navigate to Livros after logging in', () => {
    component.find('button#log-in').simulate('click');
    expect(mockPush).toHaveBeenCalledWith(Routes.Livros);
  });
});
