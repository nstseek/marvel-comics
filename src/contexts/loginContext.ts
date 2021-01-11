import React from 'react';

export const loginKey = 'login';

interface ContextType {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginContext = React.createContext<ContextType>({
  loggedIn: !!sessionStorage.getItem(loginKey),
  setLoggedIn: (state: boolean): any => state
});

export default LoginContext;
