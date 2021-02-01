import React, { Component } from "react";
import useState from "react"
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
//import Grid from '@material-ui/core/Grid';
//import axios from 'axios';
import jwt_decode from 'jwt-decode';
import swal from "sweetalert";
import { Grid, Image, Segment,Rail } from 'semantic-ui-react'
class home extends Component {


 
  constructor(props) {

    super(props);

    this.state = {
                      posts:[]     };



  }
componentWillMount(){
  const authToken = localStorage.getItem('AuthToken');
  axios.defaults.headers.common = { Authorization: `${authToken}` };

 axios.get("http://localhost:5001/fire-quizduell/europe-west1/api/allquestion")
 
.then((response)=>{

  const post = response.data;
 

  console.log(response)

this.setState({ posts:post });





}).catch((err) => {
 
});
}

togglePopup(entry){
  axios.get("http://localhost:5001/fire-quizduell/europe-west1/api/questionFilter?testfeld="+entry)
 
  .then((response)=>{
  
  console.log( response.data);
   
  this.props.history.push({
    pathname: '/PlayQuiz',
    data:response.data
  })

    console.log(response)
  
 
  
  
  
  
  }).catch((err) => {
   
  });




}

  render() {
    return (
     
      <Grid celled padded style={{width: '140vh'}} >
    <Grid.Row color="teal">
     
        
      <h3> Hallo! Herzlich Willkommen auf der Startseite </h3>
   
   
      </Grid.Row>
      <Grid.Row >
      <Grid.Column width={10} style={{height: '70%'}} >
      <Segment stacked color="green">
      <p>Wenn du das Quiz Spielen willst bitte wähle aus dem Dropdown ein Themenfeld aus.
       
       <select>
         {
          this.state.posts.map((entry,key) => {
             return <option  onClick={()=>this.togglePopup(entry.testFeld)}key={key} value={entry.testFeld}>{entry.testFeld}</option>;
           })}
       </select> 
</p>
</Segment>
      </Grid.Column>
      <Grid.Column floated='right' width={3} style={{height: '30%'}} >
      <Segment raised>
<p>Quiz Fragen erstellen      <Link to="/CreateQuiz">CreateQuiz</Link></p>
</Segment>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column width={3}>
      <Segment piled>
      <p>Quiz Fragen ansehen    <Link to="/ViewQuiz">ViewQuiz</Link></p>
      </Segment>
      </Grid.Column>
      <Grid.Column width={10}>
      <Segment raised color="yellow">
      <p>Profil Seite</p>
      </Segment>
      </Grid.Column>
      <Grid.Column width={3}>
        <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
      </Grid.Column>
    </Grid.Row>
  </Grid>
    
    );
  }
}
export default home;
