import React, { Component, useState } from "react";

import { Link } from "react-router-dom";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";

import { FormErrors } from "../Validation/FormError";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { GithubLoginButton, GoogleLoginButton, FacebookLoginButton } from 'react-social-login-buttons'
import swal from "sweetalert";
import axios from "axios";
import Grid from '@material-ui/core/Grid'
class login extends Component {
 
  constructor(props) {
 
    super(props);
    this.state = {
      email: "",
   
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
      password: this.state.password,
      
    };
  
    axios
      .post(
        "https://europe-west1-fire-quizduell.cloudfunctions.net/api/login",
        newUserData
      )
      .then((response) => {
      
      sessionStorage.setItem("AuthToken", `${response.data}`);
      sessionStorage.setItem('UserEmail', this.state.email);
      sessionStorage.setItem('UserPassword', this.state.password);
      window.location=("/")
     //console.log(x);
        swal("loggedin ");
       
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

 
 

  componentDidMount = () => {
    const Authtoken=sessionStorage.getItem("AuthToken");
    if(Authtoken!==null){
      this.props.history.push({
        pathname:'/'
      });
      // this.history.push('/login'));

    }
    
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
          Login
          </button>
          <Grid container spacing={2}>
          <Grid item xs={12}>
            <GithubLoginButton>
              <span >Sign up with Github</span>
            </GithubLoginButton>
            
          </Grid>
</Grid>
<Grid container spacing={2}>
          <Grid item xs={12}>
            <GoogleLoginButton 
          >
              <span >Sign up with Google</span>
            </GoogleLoginButton>
            
          </Grid>
</Grid>
<Grid container spacing={2}>
          <Grid item xs={12}> 
            <FacebookLoginButton >
              <span >Sign up with Facebook</span>
            </FacebookLoginButton>
            
          </Grid>
</Grid>


      { /*  {this.state.isSignedIn || this.state.signedin  ? (
         <button onClick={() => firebase.auth().signOut()}>
         Sign out!
       </button>
          
          ) : (
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          )}
     
          
          */}
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
