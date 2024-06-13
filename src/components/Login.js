// src/components/Login.js
import React, {useState} from 'react';
import { loginUser } from '../controllers/LoginController';
import LoginForm from './Forms/LoginForm';
import { useNavigate } from 'react-router-dom';
import './styles/LoginPage.css';
import RegisterForm from "./Forms/RegisterForm";
import {registerUser} from "../controllers/RegisterController";

const Login = () => {
    const navigate = useNavigate();
    const [isRegistering, setIsRegistering] = useState(false);

    const handleLogin = async (username, password) => {
        try {
            const data = await loginUser(username, password);
            localStorage.setItem('authToken', data.token);
            if(data.user._type === "Admin")
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

export default Login;
