import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
var firebaseConfig ={
    apiKey: "AIzaSyBUXNmZ7OCxQAhTUZKPkLyLO8sWn2-PmRE",
    authDomain: "fire-quizduell.firebaseapp.com",
    projectId: "fire-quizduell",
    storageBucket: "fire-quizduell.appspot.com",
    messagingSenderId: "11323579019",
    appId: "1:11323579019:web:134084970adf9a43bad28e",
    measurementId: "G-1N8WP0X5CV"
};
const fire =firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();

export const signInWithGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider()

  const currentUser =  firebase.auth().currentUser
      const res = currentUser
        ?  currentUser.linkWithPopup(googleProvider)
        : firebase.auth().signInWithPopup(googleProvider)


      if (!currentUser) {
        const firebaseUser = res.user
      
        console.log('user: ', firebaseUser)
      } else {
        // maybe get user through API
      }
}

export const loginWithFacebook=() => {
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithRedirect(provider);
  firebase
  .auth()
  .getRedirectResult()
  .then((result) => {
    
    var credential = result.credential;

    // The signed-in user info.
    var user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var accessToken = credential.accessToken;
    console.log(result);
    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

    // ...
  });
 }


export default {
  fire, 
}