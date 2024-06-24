import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import PrivateRoute from './utils/PrivateRoute';
import Home from './components/Home';
import Product from './components/Product';
import Task from './components/Task';
import Order from './components/Order';
import Login from './components/Login';
import './App.css';
import Layout from "./components/Layout";
import { AppGlobalProvider } from "./contexts/AppGlobalContext";
import User from "./components/User";
import Setting from "./components/Setting";
import { ThemeProvider } from "./contexts/ThemeContext";
import Logistic from "./components/Logistic";
import { SERVER_URL } from './config';

import io from 'socket.io-client';

const socket = io(SERVER_URL);

const AppContent = () => {
    const { user } = useAuth();

    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const [isChatVisible, setIsChatVisible] = useState(true);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages((messages) => [...messages, message]);
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (name && message) {
            socket.emit('sendMessage', { name, message });
            setName('');
            setMessage('');
        }
    };

    const viewStorage = true
    return (
        <div>
            <div className="App">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route
                        path="*"
                        element={
                            <Layout>
                                <Routes>
                                    <Route path="/tasks" element={<PrivateRoute><Task /></PrivateRoute>} />
                                    {user && user._type === 'Admin' && (
                                        <>
                                            <Route path="/orders" element={<PrivateRoute><Order /></PrivateRoute>} />
                                            <Route path="/users" element={<PrivateRoute><User /></PrivateRoute>} />
                                        </>
                                    )}
                                    <Route path="/products" element={<PrivateRoute><Product /></PrivateRoute>} />
                                    <Route path="/settings" element={<PrivateRoute><Setting /></PrivateRoute>} />
                                    <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
                                    <Route path="/logistic" element={<PrivateRoute><Logistic viewStorage={viewStorage} /></PrivateRoute>} />
                                    <Route path="*" element={<Navigate to="/home" replace />} />
                                </Routes>
                            </Layout>
                        }
                    />
                </Routes>
            </div>
            {isChatVisible && (
                <div className={`chat-container ${isChatVisible ? "visible" : ""}`}>
                    <div className="chat-messages">
                        <ul>
                            {messages.map((message, index) => (
                                <li key={index}>
                                    {message.name}: {message.message}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="chat-form">
                        <form onSubmit={handleSubmit}>
                            <input type="text" value={name} placeholder="Your name" onChange={(event) => setName(event.target.value)} />
                            <input type="text" value={message} placeholder="Your message" onChange={(event) => setMessage(event.target.value)} />
                            <button type="submit">Send</button>
                        </form>
                    </div>
                </div>
            )}
            <button onClick={() => setIsChatVisible(!isChatVisible)} className={`chat-toggle-button ${isChatVisible ? "chat-toggle-button-open" : ""}`}>
                {isChatVisible ? '-' : '+'}
            </button>
        </div>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <AppGlobalProvider>
                <ThemeProvider>
                    <BrowserRouter>
                        <AppContent />
                    </BrowserRouter>
                </ThemeProvider>
            </AppGlobalProvider>
        </AuthProvider>
    );
};

export default App;
