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
componentDidMount(){
  const authToken = sessionStorage.getItem('AuthToken');
  axios.defaults.headers.common = { Authorization: `${authToken}` };

 axios.get("https://europe-west1-fire-quizduell.cloudfunctions.net/api/allquestion")

.then((response)=>{

  const post = response.data;

  
 
  

  console.log(response)
  
this.setState({ posts: this.makeListWithoutDuplicates(post)});

console.log(this.state.posts)



}).catch((err) => {
 
});
}
removeDuplicates(arr) {
  const map = new Map();
  //arr.forEach(v => map.set(v.abc_buildingid, v)) // having `abc_buildingid` is always unique
  var listLength = arr.length;
  for (var i = 0; i < listLength; i++) {
    let elem =arr[i];
    for (var j = 0; j < listLength; j++) {
      //i != j This prevents the actual index from being deleted
      //x.options[i].value == x.options[j].value => it finds the duplicate index.
      if (elem.testFeld == arr[j].testFeld && i != j) {
        //Remove duplicate option element
        arr.remove(j);
        console.log(arr)
        //Refresh the list Length
        listLength--;
      }
    }
  }
 

  //return [arr.values()];
 
}

makeListWithoutDuplicates(arr){
  let onlyTestFeldArr = [];
  var count = 0;
  for(var i=0; i<arr.length; i++){
    let elem = arr[i];
   // if(i == 0){
   //   onlyTestFeldArr[i]=elem.testFeld;
   // }
   if (typeof elem.testFeld !== 'undefined') {
   onlyTestFeldArr[count]=elem.testFeld;
   count++;
   }
   
  }
  var dumbi = new Set(onlyTestFeldArr);
  var xumbie=Array.from(dumbi);
  console.log(dumbi);
  return xumbie;
}


togglePopup(entry){
  const authToken = sessionStorage.getItem('AuthToken');
  axios.defaults.headers.common = { Authorization: `${authToken}` };
  axios.get("https://europe-west1-fire-quizduell.cloudfunctions.net/api/questionFilter?testfeld="+entry)
 
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
             return <option  onClick={()=>this.togglePopup(entry)} key={key} value={entry}>{entry}</option>;
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
 
    </Grid.Row>
  </Grid>
    
    );
  }
}
export default home;
