// src/components/Login.js
import React from 'react';
import { loginUser } from '../controllers/LoginController';
import LoginForm from './Forms/LoginForm';

const Login = () => {
  const handleLogin = async (username, password) => {
    try {
      const token = await loginUser(username, password);
      localStorage.setItem('authToken', token);
      alert('Login successful!');
      // Redirect to the main page or another page as needed
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default Login;
