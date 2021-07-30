import React, { useState, useEffect } from "react";
import "./App.css";
import fire from "./components/Firebase";
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import Navbar from "./components/Navbar";

function App() {
  // setting up all the states that are going to be used for authentication
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [password, setPassword] = useState("");
  const [passErr, setPassErr] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    /* Making sure that every time we try to login/sign up again, the inputs are cleared*/
    setEmail("");
    setPassword("");
    setEmailErr("");
    setPassErr("");
    /*For authentication, and for saving users data I have used firebase, and here we can see how to set up login with firebase*/
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
    /* Like in login function, here we also have firebase to help us with register*/
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
    fire.auth().signOut(); //simple function that allows users to sign out from page
  };

  const authListener = () => {
    // with this firebase function we check if the user already has an account
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    // useEffect was used here so with every render we can check if the use has an account
    authListener();
  }, []);

  return (
    /*With ternary operator I was able to check if the user was logged in, and if they were then they were presented with main page, if not then they would be presented with login screen, and for that I used Login component with props so I can transfer values from this component to another in this case Login*/
    <div className="App">
      {user ? (
        <div>
          <Navbar handleLogout={handleLogout} />
          <MainPage />
        </div>
      ) : (
        <div>
          <h1 className="title">Movie App</h1>
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
        </div>
      )}
    </div>
  );
}

export default App;
