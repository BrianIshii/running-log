import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDoXhfdPJa4TQg2Q7GYVRgRRPTq-9L-hwM",
  authDomain: "running-log-35410.firebaseapp.com",
  projectId: "running-log-35410",
  storageBucket: "running-log-35410.appspot.com",
  messagingSenderId: "209753067800",
  appId: "1:209753067800:web:4427279567ff269d9b0e6d",
  measurementId: "G-BG1WNVVR7M"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//analytics is optional for this tutoral 

const storage = firebase.storage()

export  {
  storage, firebase as default
}

