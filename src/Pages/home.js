import React, {Component} from 'react'
import  { Redirect } from 'react-router-dom'
//import Grid from '@material-ui/core/Grid';
//import axios from 'axios';
class home extends Component{
  constructor(props){

    super(props)
      this.state={

      }
    
  }
    render() {
        return (
      <div>
        <h1> You are Logged in !!!</h1>
        <button> Logout</button>
        </div>
        )
      }


}
export default home;