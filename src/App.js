import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './utils/PrivateRoute';
import Home from './components/Home';
import Product from './components/Product';
import Login from './components/Login';
import './App.css';
import Layout from "./components/Layout";

const AppContent = () => {
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
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
