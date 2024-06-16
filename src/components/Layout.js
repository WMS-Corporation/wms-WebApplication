import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';
import PropTypes from "prop-types";
import "./styles/Layout.css"

const Layout = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    let { isAuthenticated } = useAuth () || {};

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="layout">
            {isAuthenticated && <Header toggleSidebar={toggleSidebar} />}
            {isAuthenticated && <Sidebar isOpen={isOpen} />}
            <main className={isOpen ? 'content-open' : 'content'}>
                {children}
            </main>
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;