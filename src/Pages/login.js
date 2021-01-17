import React, { Component, useState } from "react";
import firebase from "firebase";
import { Link } from "react-router-dom";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebaseConfig from "../config/config";
import { FormErrors } from "../Validation/FormError";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
class login extends Component {
 
  constructor(props) {
 
    super(props);
    this.state = {
      email: "",
      displayName:"",
      password:"",
      
      signedin:false
     
  }
  }
  
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();

    const newUserData = {
      email: this.state.email,
      displayName: this.state.displayName,
      password: this.state.password,
      
    };
  
    axios
      .post(
        "https://europe-west1-fire-quizduell.cloudfunctions.net/api/login",
        newUserData
      )
      .then((response) => {
      localStorage.setItem("AuthToken", `${response.data}`);
      sessionStorage.setItem('UserEmail', this.state.email);
      sessionStorage.setItem('UserPassword', this.state.password);
      sessionStorage.setItem('displayName', this.state.password);
     //console.log(x);
        swal("loggedin ");
        this.props.history.push({
          pathname: '/CreateQuiz',
          data: response.data // your data array of objects
        })
        console.log(response.data);

        this.setState({
          signedin:true

        })
        
        //let history = useHistory();
        //history.push('/login');
      })
      .catch((err) => {
        var errorMessage = err.response.data.message;

        swal(errorMessage);
      });
  };


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

    var x=firebase.auth().currentUser;
    console.log(x);
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
        <div className="form-group">
            <label>Please Enter Email</label>
            <input
              type="email"
              defaultValue={this.state.email}
              onChange={this.handleChange}
              className="form-control"
              name="email"
              id="email"
              placeholder="email"
            />
          </div>
          <div className="form-group">
            <label>Please Enter Username</label>
            <input
              type="text"
              defaultValue={this.state.displayName}
              onChange={this.handleChange}
              className="form-control"
              name="displayName"
              id="displayName"
              placeholder="Enter Username"
            />
          </div>

          <div className="form-group">
            <label>Please Enter Password</label>
            <input
              type="password"
              onChange={this.handleChange}
              defaultValue={this.state.password}
              className="form-control"
              name="password"
              id="password"
              placeholder="email"
            />
          </div>

          <button
            className="btn btn-primary btn-block "
            type="submit"
            onClick={this.handleSubmit}
          >
            Sign Up
          </button>

          {this.state.isSignedIn || this.state.signedin  ? (
            <span>
              <div>Signed In!</div>
              <Link to="/CreateQuiz">CreateQuiz</Link>

              {/*  <button onClick={() => firebase.auth().signOut()}>
                Sign out!
              </button>

          */}
            </span>
          ) : (
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          )}
        </div>

        <p>
          Du hast dich noch nicht registriert? Dann Klicke hier auf{" "}
          <Link to="/signup">Signup</Link>
        </p>
        <p>
          Hast du dein Passwort vergessen? Klicke hier um es zu ändern{" "}
          <Link to="/Resetpassword">Password reset</Link>
        </p>
      </div>
    );
  }
}
export default login;
