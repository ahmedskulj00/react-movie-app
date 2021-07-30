import React from "react";
import "../App.css";
/* Here we can see that I transfered all the necessary functions that are needed for this component using props*/
const Login = (props) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleRegister,
    isLoggedIn,
    setIsLoggedIn,
    emailErr,
    passErr,
  } = props;

  return (
    <div className="login-container">
      <div className="login-screen">
        <input
          type="text"
          required
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)} // Here we have an input for email, with onChange that allows us to take value from input and to put it into a state called email
        />
        <p className="error-message">{emailErr}</p>

        <input
          type="password"
          required
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} // Same thing, but this time it is for password
        />
        <p className="error-message">{passErr}</p>
        <div>
          {isLoggedIn ? ( // Here I used ternary operator which help users to switch between log in and sign up, basically I just used state from app.js called isLoggedIn to help me with this, because it is a boolean state
            <div>
              <button className="btn-auth" onClick={handleLogin}>
                Sign in
              </button>
              <p className="auth-message">
                Register, if you haven't already{" "}
                <span onClick={() => setIsLoggedIn(!isLoggedIn)}>Register</span>
              </p>
            </div>
          ) : (
            <div>
              <button className="btn-auth" onClick={handleRegister}>
                Sign up
              </button>
              <p className="auth-message">
                Login if you have an account{" "}
                <span onClick={() => setIsLoggedIn(!isLoggedIn)}>Login</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
