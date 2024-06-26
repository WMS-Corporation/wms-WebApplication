import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import io from 'socket.io-client';
import { toast, ToastContainer } from 'react-toastify';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import PrivateRoute from './utils/PrivateRoute';
import Home from './components/Home';
import Product from './components/Product';
import Task from './components/Task';
import Order from './components/Order';
import Login from './components/Login';
import Layout from "./components/Layout";
import { AppGlobalProvider } from "./contexts/AppGlobalContext";
import User from "./components/User";
import Setting from "./components/Setting";
import { ThemeProvider } from "./contexts/ThemeContext";
import Logistic from "./components/Logistic";

import { SERVER_URL } from './config';

const AppContent = () => {
    const { user } = useAuth();

    useEffect(() => { 
        const socket = io(SERVER_URL);   
        // Ascolto degli eventi di alert di temperatura
        socket.on('temperature-alert', (data) => {
          // console.log('Temperature Alert:', data);
          toast(`Temperature Alert: ${data.zone} - ${data.temperature}°C`);
        });
    
        // Pulizia alla disconnessione
        return () => {
          socket.off('temperature-alert');
          socket.disconnect();
        };
      }, []);

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
                        <ToastContainer />
                    </BrowserRouter>
                </ThemeProvider>
            </AppGlobalProvider>
        </AuthProvider>
    );
};

export default App;
