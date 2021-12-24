// Import the functions you need from the SDKs you need
import firebase from 'firebase/app'
import 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAH5d3Wjr_NgyJgdx9ra7WjZOzmVx08eHk",
  authDomain: "fir-react-upload-391f1.firebaseapp.com",
  projectId: "fir-react-upload-391f1",
  storageBucket: "fir-react-upload-391f1.appspot.com",
  messagingSenderId: "815346693654",
  appId: "1:815346693654:web:9d67a268ca505c96fa6737",
  measurementId: "G-J6R2THCK2K"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage= firebase.storage()
export { storage, firebase as default};