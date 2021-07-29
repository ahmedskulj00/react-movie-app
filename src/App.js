import React, { useState, useEffect } from "react";
import "./App.css";
import fire from "./components/Firebase";
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import Navbar from "./components/Navbar";

function App() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [password, setPassword] = useState("");
  const [passErr, setPassErr] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setEmail("");
    setPassword("");
    setEmailErr("");
    setPassErr("");
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailErr(err.message);
            break;
          case "auth/wrong-password":
            setPassErr(err.message);
            break;
        }
      });
  };

  const handleRegister = () => {
    setEmail("");
    setPassword("");
    setEmailErr("");
    setPassErr("");
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailErr(err.message);
            break;
          case "auth/weak-password":
            setPassErr(err.message);
            break;
        }
      });
  };

  const handleLogout = () => {
    fire.auth().signOut();
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  return (
    <div className="App">
      <h1 className="title">Movie App</h1>
      {user ? (
        <div>
          <Navbar handleLogout={handleLogout} />
          <MainPage />
        </div>
      ) : (
        <Login
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          handleRegister={handleRegister}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          emailErr={emailErr}
          passErr={passErr}
        />
      )}
    </div>
  );
}

export default App;
