import React, { Component, useState } from "react";
import firebase from "firebase";
import { Link } from "react-router-dom";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebaseConfig from "../config/config";
import { FormErrors } from "../Validation/FormError";
import axios from "axios";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";
class login extends Component {
  state = { isSignedIn: false, err: "" };
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,

      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false,
    },
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ isSignedIn: !!user });
      console.log("user", user);
    });
  };
  render() {
    return (
      <div className="login">
        <h3>Login</h3>
        <div style={{ textAlign: "center" }}>
          {this.state.isSignedIn ? (
            <span>
              <div>Signed In!</div>
              <button onClick={() => firebase.auth().signOut()}>
                Sign out!
              </button>
            </span>
          ) : (
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          )}
          <p>
            Du hast dich noch nicht registriert? Dann Klicke hier auf{" "}
            <Link to="/signup">Signup</Link>
          </p>
          <p>
            Hast du dein Passwort vergessen? Klicke hier um es zu ändern{" "}
            <Link to="/Resetpassword">Password reset</Link>
          </p>
        </div>
      </div>
    );
  }
}
export default login;
