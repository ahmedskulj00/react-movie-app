import React from "react";

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
    <div>
      <label>Username</label>
      <input
        type="text"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <p>{emailErr}</p>
      <label>Password</label>
      <input
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p>{passErr}</p>
      <div>
        {isLoggedIn ? (
          <div>
            <button onClick={handleLogin}>Sign in</button>
            <p>
              Register, if you haven't already{" "}
              <span onClick={() => setIsLoggedIn(!isLoggedIn)}>Register</span>
            </p>
          </div>
        ) : (
          <div>
            <button onClick={handleRegister}>Sign up</button>
            <p>
              Login if you have an account{" "}
              <span onClick={() => setIsLoggedIn(!isLoggedIn)}>Login</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
