import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPeopleCarry, FaTasks, FaClipboardList, FaWarehouse } from 'react-icons/fa';
import { IoSettingsOutline } from "react-icons/io5";
import { HiTemplate } from "react-icons/hi";
import { FaCube } from "react-icons/fa6";
import './styles/Sidebar.css';
import PropTypes from "prop-types";
import Header from "./Header";

const Sidebar = ({isOpen}) => {

  return (
      <div className='navbar'>
        <nav className={isOpen ? 'sidebar-menu' : 'nav-menu'}>
          <ul className="nav-menu-items">
            <li className="sidebar-item">
              <FaCube/>
              <Link to="/home">Dashboard</Link>
            </li>
            <li className="sidebar-item">
              <HiTemplate/>
              <Link to="/products">Products</Link>
            </li>
            <li className="sidebar-item">
              <FaTasks/>
              <Link to="/tasks">Tasks</Link>
            </li>
            <li className="sidebar-item">
              <FaClipboardList/>
              <Link to="/orders">Orders</Link>
            </li>
            <li className="sidebar-item">
              <FaWarehouse/>
              <Link to="/logistic">Logistic</Link>
            </li>
            <li className="sidebar-item">
              <FaPeopleCarry/>
              <Link to="/users">Users</Link>
            </li>
            <li className="sidebar-item">
              <IoSettingsOutline/>
              <Link to="/settings">Settings</Link>
            </li>
          </ul>
        </nav>
      </div>

  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.func.isRequired,
};

export default Sidebar;
