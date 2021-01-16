import React, { Component } from "react";
import { Redirect } from "react-router-dom";
//import Grid from '@material-ui/core/Grid';
import axios from "axios";
import swal from "sweetalert";
import firebase from "firebase";
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
      imageUrl: "",
      videoUrl: "",
      audioUrl: "",
      displayName: "",
    };
  }
  handleCreateQuestion = (event) => {
    event.preventDefault();
    var user = firebase.auth().currentUser.displayName;
    console.log(user);
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
      displayName: user,
    };
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
            <input
              type="file"
              onChange={this.handleChange}
              defaultValue={this.state.imageUrl}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Choose a Video</label>
            <input
              type="file"
              onChange={this.handleChange}
              defaultValue={this.state.videoUrl}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Choose a Audio</label>
            <input
              type="file"
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
