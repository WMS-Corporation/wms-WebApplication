import React from 'react';
import PropTypes from 'prop-types';
import {FaBars} from "react-icons/fa";
import { IoMdPower } from "react-icons/io";
import logo from "../assets/logo.png";
import './styles/Header.css';

const Header = ({toggleSidebar}) => {
  return (
    <header className="header">
        <FaBars className="sidebar-toggle" onClick={toggleSidebar}/>
        <div className="logo-container">
            <img src={logo} alt="WMS Logo" className="logo"/>
            <h3 className="sidebar-logo">WMS</h3>
        </div>
        <IoMdPower className="power-off"/>
    </header>
  );
};

Header.propTypes = {
    toggleSidebar: PropTypes.func.isRequired,
};

export default Header;
