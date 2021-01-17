import React, { Component } from "react";
import Link from "react-router-dom/Link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import firebase from "firebase";
import swal from "sweetalert";
import axios from"axios";
class Navbar extends Component {
  logout() {
    var user = firebase.auth().currentUser;
    console.log(user);
    axios
    .post(
      "https://europe-west1-fire-quizduell.cloudfunctions.net/api/logout",user
    )
    .then((response) => {
   //  localStorage.setItem("AuthToken", `${response.data.token}`);
   
      swal("logged-out ");
     
      //let history = useHistory();
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
          <Button color="inherit" component={Link} to="/home">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/signup">
            Signup
          </Button>
          <Button color="inherit" onClick={this.logout}>
            Sign out!
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}
export default Navbar;
