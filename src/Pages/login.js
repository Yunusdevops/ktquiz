import React, {Component} from "react"
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

firebase.initializeApp({
  apiKey: "AIzaSyBUXNmZ7OCxQAhTUZKPkLyLO8sWn2-PmRE",
  authDomain: "fire-quizduell.firebaseapp.com"
})
 class Login extends Component{
     state={isSignedIn : false}
     uiConfig = {
        signInFlow: "popup",
        signInOptions: [
           
           
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
     
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        callbacks: {
          signInSuccess: () => false
        }
      }
    
      componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
          this.setState({ isSignedIn: !!user })
          console.log("user", user)
        })
      }
      render() {
        return (
          <div className="login">
            {this.state.isSignedIn ? (
              <span>
                <div>Signed In!</div>
                <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
               
              </span>
            ) : (
              <StyledFirebaseAuth
                uiConfig={this.uiConfig}
                firebaseAuth={firebase.auth()}
              />
            )}

          </div>
        );
   

            }
    
 }
 export default Login;