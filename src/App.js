import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { storage } from "./firebase/firebase"
import firebase from "firebase/app";
import "firebase/auth";
import { buildMetaData } from './log-template';


var provider = new firebase.auth.GoogleAuthProvider();
function googleSignInRedirectResult(callback) {
  // [START auth_google_signin_redirect_result]
  firebase.auth()
    .getRedirectResult()
    .then((result) => {
      if (result.credential) {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // ...
        callback({loggedIn: true});
        console.log(result)
      }
      // The signed-in user info.
      var user = result.user;
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
       callback({loggedIn: false});
    });
  // [END auth_google_signin_redirect_result]
}

function App() {
  const allInputs = {imgUrl: ''}
  const [text, setText] = useState('')

  const [user, setUser] = useState({ loggedIn: false });

  useEffect(() => {
    const unsubscribe = googleSignInRedirectResult(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  const handleFirebaseUpload = e => {
    e.preventDefault()
    console.log('start of upload')
    var date = new Date()

    console.log(text)
    const metadata = buildMetaData({'title': "'hi'"})
    let blob = new Blob([metadata, "#" + text,text], {type: 'text/markdown'})
    const uploadTask = storage.ref(`/test/${date.toUTCString()}`).put(blob)
    
    uploadTask.on('state_changed', 
    (snapShot) => {
      console.log(snapShot)
    }, (err) => {
      console.log(err)
    }, () => {
      console.log('success')
    })
  }

  const handleTextChange = (e) => {
    const text = e.target.value
    setText(text)
  }

  const signin = () => {
    firebase
      .auth()
      .signInWithRedirect(provider)
      .then((result) => {
        console.log({result})
      }).catch((error) => {
        console.log({error})
      });
  }

  return (
    <div className="App">
      <form onSubmit={handleFirebaseUpload}>
        <label for="quantity">Listening To:</label><br/>
        <input 
          type="text"
          onChange={handleTextChange}
        /><br/>
        <label for="quantity">How was the run?</label><br/>
        <textarea 
          type="text"
          onChange={handleTextChange}
        /><br/>
        <button>upload to firebase</button>
      </form>
        <button onClick={() => signin() }>signin</button>
        { user.loggedIn ? "logged in" : "not logged in" }
    </div>
  );
}

export default App;
