import React, {Component,useState} from "react"
import firebase from "firebase";
import { Link } from 'react-router-dom';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebaseConfig from "../config/config";
import {FormErrors} from "../Validation/FormError"

 class Login extends Component{
    constructor(props){
      super(props)
      this.state1={
        email: '',
        password: '',
        formErrors: {email: '', password: ''},
        emailValid: false,
        passwordValid: false,
        formValid: false
      }


    }
    
    handleUserInput = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({[name]: value},
                    () => { this.validateField(name, value) });
    }
    validateField(fieldName, value) {
      let fieldValidationErrors = this.state1.formErrors;
      let emailValid = this.state1.emailValid;
      let passwordValid = this.state1.passwordValid;
  
      switch(fieldName) {
        case 'email':
          emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
          fieldValidationErrors.email = emailValid ? '' : ' is invalid';
          break;
        case 'password':
          passwordValid = value.length >= 6;
          fieldValidationErrors.password = passwordValid ? '': ' is too short';
          break;
        default:
          break;
      }
      this.setState({formErrors: fieldValidationErrors,
                      emailValid: emailValid,
                      passwordValid: passwordValid
                    }, this.validateForm);
    }
  
    validateForm() {
      this.setState({formValid: this.state1.emailValid && this.state1.passwordValid});
    }
  
    errorClass(error) {
      return(error.length === 0 ? '' : 'has-error');
    }
    login() {

      var errorCode;
      var errorMessage;
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((u) => {
          console.log('Successfully Logged In');
        })
        .catch((err) => {
          errorCode = err.code;
          errorMessage = err.message;
          if (errorCode === 'auth/wrong-password') {
            console.log("Wrong password");
            alert('Wrong password.');
          } else {
            console.log("Navigate to Home");
            this.props.navigation.navigate('Home');
          }


        })
    }

     state={isSignedIn : false,err:""}
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
              <h3>Login</h3>
     <div style={{ textAlign: 'center' }}>
    
   
     <form>
  
     <div className="panel panel-default">
          <FormErrors formErrors={this.state1.formErrors} />
          
        </div>
       
        <div className={`form-group ${this.errorClass(this.state1.formErrors.email)}`}>

            <label>Email</label>
            <input type="email" id="email"  defaultValue={this.state1.email}
            onChange={this.handleUserInput} name="email" className="form-control" 
            placeholder="Email .. "
        />
     
        </div>
        <div className={`form-group ${this.errorClass(this.state1.formErrors.password)}`}>
      
            <label>Passwort</label>
            <input type="password" id="password" name="password" className="form-control" 
            placeholder="Password  ..."
            defaultValue={this.state1.password}
            onChange={this.handleUserInput}  />
            
        </div>
       
  
        <button  className="btn btn-primary btn-block "   onClick={this.login} disabled={this.state1.value}>Login</button>
   
     </form>


       
      </div>


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
            <p>Du hast dich noch nicht registriert? Dann Klicke hier auf <Link to="/signup">Signup</Link></p>
            <p>Hast du dein Passwort vergessen? Klicke hier um es zu ändern <Link to="/Resetpassword">Password reset</Link></p>
          </div>
        );
   

            }
    
 }
 export default Login;