import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const ProtectedRoute = (props) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? <Route {...props} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;