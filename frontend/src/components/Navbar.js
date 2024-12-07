import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Opportuniti</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/jobs">Jobs</Link></li>
        <li><Link to="/employers">Employers</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/auth">Login/Sign Up</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
