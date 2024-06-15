import React from 'react';
import { Link } from 'react-router-dom';
import { FaPeopleCarry, FaTasks, FaClipboardList, FaWarehouse } from 'react-icons/fa';
import { IoSettingsOutline } from "react-icons/io5";
import { HiTemplate } from "react-icons/hi";
import { FaCube } from "react-icons/fa6";
import './styles/Sidebar.css';
import PropTypes from "prop-types";

const Sidebar = ({isOpen}) => {

  return (
      <div className='navbar'>
        <nav className={isOpen ? 'sidebar-menu' : 'nav-menu'}>
          <ul className="nav-menu-items">
            <li className="sidebar-item">
              <Link to="/home">
                <FaCube/>
                <span>Dashboard</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="/products">
                <HiTemplate/>
                <span>Products</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="/tasks">
                <FaTasks/>
                <span>Tasks</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="/orders">
                <FaClipboardList/>
                <span>Orders</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="/logistic">
                <FaWarehouse/>
                <span>Logistic</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="/users">
                <FaPeopleCarry/>
                <span>Users</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="/settings">
                <IoSettingsOutline/>
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default Sidebar;
