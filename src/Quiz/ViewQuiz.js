import React, { Component } from "react";
import { Redirect } from "react-router-dom";
//import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

import swal from "sweetalert";
import firebase from "firebase";
import jwtDecode from 'jwt-decode';
import  DataGrid from 'react-data-grid';
import { Item,Button,Label,Image,Icon,Segment, Rail } from 'semantic-ui-react'
 
class ViewQuiz extends Component {
  
  constructor(props) {
    super(props);


  this.state = {
    offset: 0,
   tableData:[],
    orgtableData: [],
    perPage: 11,
    currentPage: 0,
    maxRowCount:4,
    activePage:0,
    currentPage:0,
    leftOverData:[],
    pageOne:[]
 
  }

  //this.handlePageClick = this.handlePageClick.bind(this);
 
  }
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
        currentPage: selectedPage,
        offset: offset
    }, () => {
        this.loadMoreData()
    });

};

loadMoreData() {
const data = this.state.orgtableData;

/*const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
this.setState({
  pageCount: Math.ceil(data.length / this.state.perPage),
  tableData:slice
})*/


}
  authMiddleWare = (history) => {
    const authToken = localStorage.getItem('AuthToken');
    console.log(authToken);
    if(authToken === ""){
        swal("Bitte Anmelden")
        history.push('/login')
    }
}

getAllQuestions(){
 
    
   const authToken = sessionStorage.getItem('AuthToken');
   axios.defaults.headers.common = { Authorization: `${authToken}` };

  axios.get("https://europe-west1-fire-quizduell.cloudfunctions.net/api/questions")
  
 .then((response)=>{

   const data = response.data;
  /* this.setUpQuestionArrayValues(response.data);
   var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
   this.setState({
    pageCount: Math.ceil(data.length / this.state.perPage),
    orgtableData :response.data,
    tableData:slice
})*/

this.setState({tableData:data,
               pageOne: data[0]
})




 }).catch((err) => {
  
 
});
}
           


handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

  componentDidMount() {
    this.getAllQuestions();
  
}
update(entry){
  sessionStorage.setItem("id", entry.id.toString());
  this.props.history.push({
    pathname: '/EditQuiz'})
}
delete(entry){
  const authToken = sessionStorage.getItem('AuthToken');
  const id=entry.id;
console.log(id);
  axios.defaults.headers.common = { Authorization: `${authToken}` };
  
  
  axios.delete("https://europe-west1-fire-quizduell.cloudfunctions.net/api/question"+"/"+id)
  .then((res)=>{
    this.getAllQuestions();
    swal("Deleted Sucessfull congrats!");
  
  
  }) .catch((err) => {
 
  });
 

}  

  render() { 
    const { posts } = this.state
  
    const columns=[
      {key: 'displayName', name:'username'},
      {key:'id', name:'id'},
      {key:'testFeld', name:'Thema'},
      {key:'delete',name:'delete'},
      {key:'update',name:'update'}
      
      
      
      
      
      
      
      
      
      
                
    ];


 return(  

 <div className="wrapper-users">
     <h1 >Quiz Daten erstellt von Benutzer {this.state.pageOne.displayName}</h1>
    <Item.Group  divided >
    {this.state.tableData.map((entry,key) =>(
       <Segment textAlign='center'color='yellow'>
     
   
       <Rail internal position='left'>
       <Button onClick={()=>this.delete(entry)}floated='left'color='red'>
           Löschen
            <Icon name='delete' />
          </Button>
       </Rail>
    <Item>
      <Item.Image size='small' alt={entry.imageUrl} src={entry.imageUrl} />

      <Item.Content>
        <Item.Header as='a'>Frage: {entry.questionBody}</Item.Header>
        <Item.Meta>
        <Label>Thema: {entry.testFeld}</Label>
        </Item.Meta>
        <Item.Description>
          <p>Richtige Antwort: {entry.correctAnswer}</p>
          <p>Falsche Antworten:{entry.wrongAnswer1},{entry.wrongAnswer2},{entry.wrongAnswer3}</p>
          <p>Audio: {entry.audioUrl}</p>
          <p>Video: {entry.videoUrl}</p>
        </Item.Description>
      </Item.Content>
    </Item>
    <Rail internal  position='right'>
       <Button onClick={()=>this.update(entry)} primary floated='right'>
       <Icon name='edit' />
       {<br/>}   
           Bearbeiten 
         
            
          </Button>
       </Rail>
</Segment>
  ))}
  </Item.Group>
   {/* <DataGrid
  columns={columns}
  rows={ this.state.tableData} 
  rowsCount={this.state.tableData.length}
  
  minHeight={150} />*/}
  {/* <div className="container">
       <table className="table table-striped table-dark">
           <thead className="thead-dark">
               <tr>
                   <td>Username</td>
                   <td>id</td>
                   <td>Testfeld</td>
                   <td>questionBody</td>
                   <td>correctAnswer</td>
                   <td>wrongAnswer1</td>
                   <td>wrongAnswer2</td>
                   <td>wrongAnswer3</td>
                   <td>audioUrl</td>
                   <td>videoUrl</td>
                   <td>imageUrl</td>
                   <td>Edit</td>
                   <td>Delete</td>
           
               </tr>
           </thead>
           <tbody>
         
           {this.state.tableData.map((entry,key) =>(
                  
              <tr key={key}>
                <td>{entry.displayName}</td>
                <td>{entry.id}</td>
                <td>{entry.testFeld}</td>
                <td>{entry.questionBody}</td>
                <td>{entry.correctAnswer}</td>
                <td>{entry.wrongAnswer1}</td>
                <td>{entry.wrongAnswer2}</td>
                <td>{entry.wrongAnswer3}</td>
                <td>{entry.audioUrl}</td>
                <td>{entry.videoUrl}</td>
                <td>{entry.imageUrl}</td>
                <td> <button  class="btn btn-danger" type="button" onClick={()=>this.delete(entry)}>Delete</button></td>
                <td> <button  class="btn btn-success" type="button" onClick={()=>this.update(entry)}>Edit </button></td>
              
             
              </tr>
          

             ))}
  
              
               
                
               
               
           </tbody>
         
       </table>
       
      

   </div>*/}
 
</div>
   ); }

}

export default ViewQuiz;
