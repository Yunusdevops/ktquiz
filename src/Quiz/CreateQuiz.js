import React, { Component } from "react";
import { Redirect } from "react-router-dom";
//import Grid from '@material-ui/core/Grid';
import axios from "axios";
import swal from "sweetalert";
import firebase from "firebase";
import jwtDecode from 'jwt-decode';
import ImageUploader from 'react-images-upload';

class CreateQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testFeld: "",
      questionBody: "",
      correctAnswer: "",
      wrongAnswer1: "",
      wrongAnswer2: "",
      wrongAnswer3: "",
      imageUrl: [],
      videoUrl: "",
      audioUrl: "",

     
    };
    this.onDrop = this.onDrop.bind(this);
  }


 authMiddleWare = (history) => {
    const authToken = localStorage.getItem('AuthToken');
    if(authToken === null){
      swal("Bitte Anmelden")
        history.push('/login')
    }
}

  componentWillMount = () => {
	/*	this.authMiddleWare(this.props.history);
		const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    const mail = sessionStorage.getItem('UserEmail');
    const username=sessionStorage.getItem('displayName');
	axios.get("http://localhost:5001/fire-quizduell/europe-west1/api/users").then((response)=>{
 console.log(response);

  }).catch((err) => {
    var errorMessage = err.response.data.message;

    swal(errorMessage);
  });*/
}
  
  handleCreateQuestion = (event) => {
    event.preventDefault();
     
    console.log(this.state.displayName);
   

  //var x= localStorage.getItem("AuthToken",value);
    //var user = firebase.auth().currentUser.displayName;
    const authToken = sessionStorage.getItem('AuthToken');
    const decodetoke=jwtDecode(authToken);
    console.log(decodetoke);
    const username=sessionStorage.getItem('displayName');
    const newQuizData = {
      testFeld: this.state.testFeld,
      questionBody: this.state.questionBody,
      correctAnswer: this.state.correctAnswer,
      wrongAnswer1: this.state.wrongAnswer1,
      wrongAnswer2: this.state.wrongAnswer2,
      wrongAnswer3: this.state.wrongAnswer3,
      imageUrl: this.state.imageUrl,
      videoUrl: this.state.videoUrl,
      audioUrl: this.state.audioUrl,

     
    };
    axios.defaults.headers.common['Authorization'] = authToken ? `${authToken}` : '';
    axios
      .post(
        "https://europe-west1-fire-quizduell.cloudfunctions.net/api/question",
        newQuizData
      )
      .then((response) => {
        swal("Questions are created sucessfully");

        // this.history.push('/login'));
      })
      .catch((err) => {
        var errorMessage = err.response.data.message;

        swal(errorMessage);
      });
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
 handleImageAsFile = (e) => {
    const image = e.target.files[0];
    console.log(image);
    this.setState({
      [this.state.imageUrl]: image
    });
    const files = Array.from(e.target.files)
  

    const formData = new FormData()

    files.forEach((file, i) => {
      formData.append(i, file)
    })
}
onDrop(picture) {
  this.setState({
      imageUrl: this.state.imageUrl.concat(picture),
  });
}
  render() {
    return (
      <div className="createQuestions">
        <h3>Create Qustions</h3>

        <form>
          <div className="form-group">
            <label>Please Enter the Test Field</label>
            <input
              type="text"
              defaultValue={this.state.testFeld}
              onChange={this.handleChange}
              className="form-control"
              name="testFeld"
              id="testFeld"
              placeholder="Test field e.g. JavaScript"
            />
          </div>
          <div className="form-group">
            <label>Please Enter the Question</label>
            <input
              type="text"
              onChange={this.handleChange}
              defaultValue={this.state.questionBody}
              className="form-control"
              name="questionBody"
              id="questionBody"
              placeholder="Question"
            />
          </div>
          <div className="form-group">
            <label>Please Enter the correct Answer</label>
            <input
              type="text"
              onChange={this.handleChange}
              defaultValue={this.state.correctAnswer}
              className="form-control"
              name="correctAnswer"
              id="correctAnswer"
              placeholder="Correct Answer"
            />
          </div>
          <div className="form-group">
            <label>Please Enter a Wrong Answer</label>
            <input
              type="text"
              onChange={this.handleChange}
              defaultValue={this.state.wrongAnswer1}
              className="form-control"
              name="wrongAnswer1"
              id="wrongAnswer1"
              placeholder="Wrong Answer"
            />
          </div>
          <div className="form-group">
            <label>Please Enter a Wrong Answer</label>
            <input
              type="text"
              onChange={this.handleChange}
              defaultValue={this.state.wrongAnswer2}
              className="form-control"
              name="wrongAnswer2"
              id="wrongAnswer2"
              placeholder="Wrong Answer"
            />
          </div>
          <div className="form-group">
            <label>Please Enter a Wrong Answer</label>
            <input
              type="text"
              onChange={this.handleChange}
              defaultValue={this.state.wrongAnswer3}
              className="form-control"
              name="wrongAnswer3"
              id="wrongAnswer3"
              placeholder="Wrong Answer 3"
            />
          </div>
          <div className="form-group">
            <label>Choose a Image</label>
           {/* <input
              type="file"
              name="imageUrl"
              id="imageUrl"
              onChange={this.handleImageAsFile}
              defaultValue={this.state.imageUrl}
              className="form-control"
            />*/}
            <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
            />
          </div>
          <div className="form-group">
            <label>Choose a Video</label>
            <input
              type="file"
              name="videoUrl"
              id="videoUrl"
              onChange={this.handleChange}
              defaultValue={this.state.videoUrl}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Choose a Audio</label>
            <input
              type="file"
              name="audioUrl"
              id="audioUrl"
              onChange={this.handleChange}
              defaultValue={this.state.audioUrl}
              className="form-control"
            />
          </div>
          <button
            className="btn btn-primary btn-block "
            type="submit"
            onClick={this.handleCreateQuestion}
          >
            Create Question
          </button>
        </form>
      </div>
    );
  }
}
export default CreateQuiz;
