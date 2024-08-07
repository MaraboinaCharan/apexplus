import React from 'react';
import { Link } from 'react-router-dom';
// import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1>ApexPlus Pokemon</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/add-pokemon">Add Pokemon</Link>
        <Link to="/pokemon-list">Pokemon List</Link>
        <Link to="/add-pokemon-to-user">Add Pokemon to User</Link>
      </nav>
    </header>
  );
};

export default Header;
