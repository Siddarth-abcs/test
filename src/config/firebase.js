import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBazQ7sknQ8zn53PDQTLPQyXW4BiLXgaoE",
    authDomain: "datasystem-4ab3d.firebaseapp.com",
    databaseURL: "https://datasystem-4ab3d-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "datasystem-4ab3d",
    storageBucket: "datasystem-4ab3d.appspot.com",
    messagingSenderId: "761286626969",
    appId: "1:761286626969:web:85fb7dace68a93340eb208"
  };

  const fire = firebase.initializeApp(firebaseConfig);

  export default fire;

