// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByyWDywA_al1LZeEtdyc1C697qge4i0lE",
  authDomain: "store-tutorial-615f3.firebaseapp.com",
  projectId: "store-tutorial-615f3",
  storageBucket: "store-tutorial-615f3.appspot.com",
  messagingSenderId: "3944253493",
  appId: "1:3944253493:web:ab3571b823979c1420497c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();