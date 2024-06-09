// src/components/LoginForm.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/LoginForm.css';

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const handleLogin = () => {
      setLoading(true);
      onLogin(username, password)
        .catch((error) => {
          setErrors(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
  
    return (
      <div className="login-form">
        {errors && <div className="error">{errors.message}</div>}
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={handleLogin} disabled={loading}>Login</button>
      </div>
    );
  };
  
  LoginForm.propTypes = {
    onLogin: PropTypes.func.isRequired,
  };
  
  export default LoginForm;