import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/tasks">Tasks</Link></li>
        <li><Link to="/orders">Orders</Link></li>
        <li><Link to="/users">Users</Link></li>
        <li><Link to="/settings">Settings</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Sidebar;
