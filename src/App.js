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
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <Route exact path="/login" component={login} />
                <Route exact path="/signup" component={signup} />
                <Route exact path="/Resetpassword" component={Resetpassword} />
                <Route exact path="/CreateQuiz" component={CreateQuiz} />
                <Route exact path="/ViewQuiz" component={ViewQuiz}/>
              </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
