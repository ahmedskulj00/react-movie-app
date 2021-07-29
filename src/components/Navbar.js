import React from "react";

const Navbar = (props) => {
  const { handleLogout } = props;
  return (
    <div>
      <h1>Movie App</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Navbar;
