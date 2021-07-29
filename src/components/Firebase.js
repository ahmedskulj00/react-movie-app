import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCbDoAi1SBXDk9rRNfC2x9GuZ4bmEEeK38",
  authDomain: "react-movie-app-52bdc.firebaseapp.com",
  projectId: "react-movie-app-52bdc",
  storageBucket: "react-movie-app-52bdc.appspot.com",
  messagingSenderId: "843199820055",
  appId: "1:843199820055:web:b37996160a99d5aa528752",
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
