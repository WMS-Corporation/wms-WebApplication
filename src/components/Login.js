import React, {useState, useContext} from 'react';
import { loginUser } from '../controllers/LoginController';
import LoginForm from './Forms/LoginForm';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './styles/LoginPage.css';
import RegisterForm from "./Forms/RegisterForm";
import {registerUser} from "../controllers/RegisterController";
import PropTypes from 'prop-types';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [isRegistering, setIsRegistering] = useState(false);

    const handleLogin = async (username, password) => {
        try {
            const data = await loginUser(username, password);
            localStorage.setItem('authToken', data.token);
            navigate("/home");
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    };

    const handleRegister = async (username, password, name, surname) => {
        try {
            const data = await registerUser(username, password, name, surname);
            localStorage.setItem('authToken', data.token);
            navigate("/home");
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    };

    return (
        <div className="login-page">
            {isRegistering ? (
                <div className="register-container">
                    <RegisterForm onRegister={handleRegister} setIsRegistering={setIsRegistering}/>
                </div>
            ) : (
                <div className="login-container">
                    <LoginForm onLogin={handleLogin} setIsRegistering={setIsRegistering}/>
                </div>
            )}
            <footer className="app-footer">
                <p>&copy; 2024 - WMS Corporation - <a href="/privacy">Privacy</a></p>
            </footer>
        </div>
    );
};

AuthContext.Provider.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default Login;
