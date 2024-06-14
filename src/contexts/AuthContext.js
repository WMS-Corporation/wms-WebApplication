import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));

  const login = (token) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};