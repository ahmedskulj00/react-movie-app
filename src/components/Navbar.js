import React from "react";

const Navbar = (props) => {
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
