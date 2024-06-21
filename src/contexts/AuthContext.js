import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {useTheme} from "./ThemeContext";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
  const [user, setUser] = useState(null);

  const login = (token, user) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
    setUser(user);

  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  return useContext(AuthContext);
};