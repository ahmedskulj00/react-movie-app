import React from "react";
import "../App.css";
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
          placeholder="Username"
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="error-message">{emailErr}</p>

        <input
          type="password"
          required
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="error-message">{passErr}</p>
        <div>
          {isLoggedIn ? (
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
