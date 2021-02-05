import React, { Component } from "react";
import Link from "react-router-dom/Link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import firebase from "firebase";
import swal from "sweetalert";
import axios from"axios";
import jwtDecode from 'jwt-decode';
import { Redirect } from "react-router-dom";
import { useHistory } from 'react-router-dom';
class Navbar extends Component {
  constructor(props) {
 
    super(props);
    this.state = {
      
     isAuth:false
  }
}

componentDidMount = () =>{
  const authToken = sessionStorage.getItem('AuthToken');
  if(authToken===null){

    console.log(authToken)
   
   console.log(this.isAuth)
  }else{
    this.setState({
      isAuth:true
    })
  }
}




  logout() {
    const authToken = sessionStorage.getItem('AuthToken');
    console.log(authToken)

    axios.defaults.headers.common['Authorization'] = authToken ? `${authToken}` : '';


    axios
    .post(
      "https://europe-west1-fire-quizduell.cloudfunctions.net/api/logout"
    )
    .then((response) => {
    
    
      console.log(authToken);
      swal("logged-out ");
     
      window.location="/login";
     sessionStorage.removeItem('AuthToken');

      //
      //history.push('/login');
    })
    .catch((err) => {
      var errorMessage = err.response.data.message;
      swal(errorMessage);
    });
  

  }
  render() {
    return (
      <AppBar position="fixed">
        <Toolbar className="nav-container">
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          {this.state.isAuth ? (
        <Button color="inherit" component={Link} to="/">
                        Home </Button>
       

          ):(
            <Redirect to="/login" />
          )}
         
          <Button color="inherit" component={Link} to="/signup">
            Signup
          </Button>
          <Button color="inherit" onClick={()=>this.logout()}>
            Sign out!
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}
export default Navbar;
