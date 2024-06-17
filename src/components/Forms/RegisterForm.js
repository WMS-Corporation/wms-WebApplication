import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/RegisterForm.css';
import {FaUser, FaLock} from "react-icons/fa"

const RegisterForm = ({ onRegister, setIsRegistering }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleRegister = () => {
        setLoading(true);
        onRegister(username, password, name, surname)
            .catch((error) => {
                setErrors(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="register-form">
            <form action="">
                <h1>Register</h1>
                <div className="grid-register">
                    <div className="input-box">
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                        />
                        <FaUser className="icon"/>
                    </div>
                    <div className="input-box">
                        <input
                            type="text"
                            name="surname"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            placeholder="Surname"
                        />
                        <FaUser className="icon"/>
                    </div>
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
                </div>
            </form>
            {errors && <div className="error">{errors.message}</div>}
            <button className="btn-register" onClick={handleRegister} disabled={loading}>Register</button>
            <div className="login-link">
                <p>Back to <a onClick={() => setIsRegistering(false)} onKeyPress={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        setIsRegistering(false);
                    }
                }} tabIndex="0">Login</a></p>
            </div>
        </div>
    );
};

RegisterForm.propTypes = {
    onRegister: PropTypes.func.isRequired,
    setIsRegistering: PropTypes.func.isRequired,
};

export default RegisterForm;