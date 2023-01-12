// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "tic-tac-toe-761e7.firebaseapp.com",
  databaseURL:
    "https://tic-tac-toe-761e7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tic-tac-toe-761e7",
  storageBucket: "tic-tac-toe-761e7.appspot.com",
  messagingSenderId: "1061977094671",
  appId: "1:1061977094671:web:84eb55eea7093dafe0017a",
};

// Initialize Firebase
function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}

initFirebase();
console.log("firebase", firebase);

export { firebase };
