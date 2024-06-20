import React from 'react';
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

const AppContent = () => {
    const { user } = useAuth();

    return (
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
                                <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
                                <Route path="*" element={<Navigate to="/home" replace />} />
                            </Routes>
                        </Layout>
                    }
                />
            </Routes>
        </div>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <AppGlobalProvider>
                <BrowserRouter>
                    <AppContent />
                </BrowserRouter>
            </AppGlobalProvider>
        </AuthProvider>
    );
};

export default App;
