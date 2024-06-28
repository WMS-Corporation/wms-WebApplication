import React from 'react';
import { Link } from 'react-router-dom';
import { FaPeopleCarry, FaTasks, FaClipboardList, FaWarehouse } from 'react-icons/fa';
import { IoSettingsOutline } from "react-icons/io5";
import { HiTemplate } from "react-icons/hi";
import { FaCube } from "react-icons/fa6";
import './styles/Sidebar.css';
import PropTypes from "prop-types";
import { useAuth } from "../contexts/AuthContext";
import { useApplicationGlobal } from "../contexts/AppGlobalContext";

const Sidebar = ({ isOpen }) => {
  const { user } = useAuth() || {};

  const {
    setEditingTask,
    setAddingTask,
    setViewProductDetailTask,
    setEditingProduct,
    setAddingProduct,
    setEditingOrder,
    setAddingOrder,
    setViewProductDetailOrder,
    setEditingUser,
    setAddingUser
  } = useApplicationGlobal() || {};

  const handleLinkClick = () => {
    setViewProductDetailTask(null);
    setAddingTask(false);
    setEditingTask(null);
    setEditingProduct(null);
    setAddingProduct(false);
    setEditingOrder(null);
    setAddingOrder(false);
    setViewProductDetailOrder(null);
    setEditingUser(null);
    setAddingUser(false);
  };
  return (
    <div className='navbar'>
      <nav className={isOpen ? 'sidebar-menu' : 'nav-menu'}>
        <ul className="nav-menu-items">
          {user && user._type === 'Admin' && (
              <li className="sidebar-item">
                <Link to="/home">
                  <FaCube/>
                  <span>Dashboard</span>
                </Link>
              </li>
          )}
          <li className="sidebar-item">
            <Link to="/products" onClick={handleLinkClick}>
              <HiTemplate/>
              <span>Products</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/tasks" onClick={handleLinkClick}>
              <FaTasks />
              <span>Tasks</span>
            </Link>
          </li>
          {user && user._type === 'Admin' && (
            <li className="sidebar-item">
              <Link to="/orders" onClick={handleLinkClick}>
                <FaClipboardList />
                <span>Orders</span>
              </Link>
            </li>
          )}
          <li className="sidebar-item">
            <Link to="/logistic">
              <FaWarehouse />
              <span>Logistic</span>
            </Link>
          </li>
          {user && user._type === 'Admin' && (
            <li className="sidebar-item">
              <Link to="/users" onClick={handleLinkClick}>
                <FaPeopleCarry />
                <span>Users</span>
              </Link>
            </li>
          )}
          <li className="sidebar-item">
            <Link to="/settings">
              <IoSettingsOutline />
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
