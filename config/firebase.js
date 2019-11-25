import * as firebase from 'firebase/app';
import 'firebase/auth';

// Your web app's Firebase configuration
throw "Need apikey"
var firebaseConfig = {
  apiKey: "AIzaSyBVGHFfaEXYGCrQRQRFn1s3d2yDdLDV0Uo",
  authDomain: "skovskolen-ca7e7.firebaseapp.com",
  databaseURL: "https://skovskolen-ca7e7.firebaseio.com",
  projectId: "skovskolen-ca7e7",
  storageBucket: "skovskolen-ca7e7.appspot.com",
  messagingSenderId: "187510322400",
  appId: "1:187510322400:web:8f7adad2bead0ceb81cc85",
  measurementId: "G-8FZELP0G2B"
};
export default function init () {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}
init()



