// src/components/LoginForm.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/LoginForm.css';
import {FaUser, FaLock} from "react-icons/fa"

const LoginForm = ({ onLogin, setIsRegistering }) => {
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
          <form action="">
              <h1>Login</h1>
              <div className="input-box">
                  <input
                      type="text"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username"
                  />
                  <FaUser className="icon"/>
              </div>
              <div className="input-box">
                  <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                  />
                  <FaLock className="icon"/>
              </div>
          </form>
          {errors && <div className="error">{errors.message}</div>}
          <button onClick={handleLogin} disabled={loading}>Login</button>
          <div className="register-link">
              <p>Don&apos;t have an account? <a onClick={() => setIsRegistering(true)} onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                      setIsRegistering(true);
                  }
              }} tabIndex="0">Register</a></p>
          </div>
      </div>
    );
};

LoginForm.propTypes = {
    onLogin: PropTypes.func.isRequired,
    setIsRegistering: PropTypes.func.isRequired,
  };
  
  export default LoginForm;