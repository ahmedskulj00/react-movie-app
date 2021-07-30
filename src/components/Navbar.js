import React from "react";
import "../App.css";
const Navbar = (props) => {
  /*As we can see this is really simple component, I transfered function handleLogout from app.js with prop functionality that is available with React, and I attached it to a button with onClick functionality */
  const { handleLogout } = props;

  return (
    <div className="navbar">
      <h1>Movie App</h1>
      <button className="btn-logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Navbar;
