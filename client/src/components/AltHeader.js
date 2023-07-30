// Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const AltHeader = ({ loggedInUser, onLogout }) => {
  const handleLogout = () => {
    // Handle logout functionality here
    // For simplicity, we'll just clear the loggedInUser state
    onLogout();
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/post">Post</Link>
          </li>
          <li>
            {loggedInUser ? (
              <>
                <p>Welcome, {loggedInUser.username}!</p>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AltHeader;
