// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import About from './components/About';
import Product from './components/Product';
import Login from './components/Login';
import './App.css';
import Layout from "./components/Layout";

const AppContent = () => {
    const location = useLocation();
    const hideSidebar = location.pathname === '/';

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route
                    path="*"
                    element={
                        <Layout>
                            <Routes>
                                <Route path="/about" element={<About />} />
                                <Route path="/products" element={<Product />} />
                                <Route path="/home" element={<Home />} />
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
        <Router>
            <AppContent />
        </Router>
    );
};

export default App;
