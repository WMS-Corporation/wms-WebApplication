import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import './styles/Header.css';
import PropTypes from 'prop-types';

const Header = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="header">
      <h1>WMS</h1>
      <button className='logout-button' onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default Header;

AuthContext.Provider.propTypes = {
  children: PropTypes.node.isRequired,
};