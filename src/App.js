import React, { Component } from "react";
import "./App.css";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import Navbar from "./Components/Navbar";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import home from "./Pages/home";
import login from "./Pages/login";
import signup from "./Pages/signup";
import Resetpassword from "./Pages/Resetpassword";
import CreateQuiz from "./Quiz/CreateQuiz";
import ViewQuiz from "./Quiz/ViewQuiz";
import EditQuiz from "./Quiz/EditQuiz";
import PlayQuiz from "./Quiz/PlayQuiz";

import swal from "sweetalert";
import { Redirect } from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#00bcd4",
      dark: "#008394",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
      contrastText: "#fff",
    },
  },
});
class App extends Component {

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
  authMiddleWare=(e)=> {
    const authToken = localStorage.getItem('AuthToken');
    if(authToken === null){
       
       swal("Nicht eingeloggt");
       window.location=("/login");
    }
}


  render() {

    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
         <Router>
            <Navbar />
            <div className="container">
            
            
            {this.state.isAuth ? (
           
       
           <Route exact  path="/"component={home} />
            ):(
              <Redirect to="/login" />

            )}
        {this.state.isAuth ? (
       
       <Route exact  path="/CreateQuiz"  component={CreateQuiz} />
       ) : (
         <Redirect to="/login" />
       )}
            {this.state.isAuth ? (
       
       <Route exact path="/EditQuiz"  component={EditQuiz}/>
       ) : (
         <Redirect to="/login" />
       )}
           
           {this.state.isAuth ? (
       
       <Route exact  path="/ViewQuiz"  component={ViewQuiz} />
    
       ) : (
         <Redirect to="/login" />
       )}
            {this.state.isAuth ? (
       
       <Route exact  path="/PlayQuiz"  component={PlayQuiz} />
    
       ) : (
         <Redirect to="/login" />
       )}
        
           <Route exact path="/login" component={login} />
                <Route exact path="/signup" component={signup} />
                <Route exact path="/Resetpassword"   component={Resetpassword} />


       
             
            
           
                
         
              
            </div>
            </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
