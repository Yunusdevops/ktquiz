import axios from "axios";
import React, { Component } from "react";
import swal from "sweetalert";
import { Redirect } from "react-router-dom";
//import Grid from '@material-ui/core/Grid';
//import axios from 'axios';
class EditQuiz extends Component {
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
  
       
      };
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  componentDidMount() {
   this.getQuestion();  
}
  getQuestion(){
    let id = sessionStorage.getItem("id");
    const authToken = sessionStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    axios.get("https://europe-west1-fire-quizduell.cloudfunctions.net/api/question"+"/"+id)
    .then((res)=>{
      console.log(res);
      this.setState({
            testFeld:res.data.testFeld,
             questionBody:res.data.questionBody,
            correctAnswer:res.data.correctAnswer,
             wrongAnswer1:res.data.wrongAnswer1,
             wrongAnswer2:res.data.wrongAnswer2,
            wrongAnswer3:res.data.wrongAnswer3,
            imageUrl:res.data.imageUrl,
            audioUrl:res.data.audioUrl,
            videoUrl:res.data.videoUrl
  
    
      }) 
    })
  }
  updateQuestion(){

const newQuizData=this.setState({
  testFeld: this.state.testFeld,
  questionBody: this.state.questionBody,
  correctAnswer: this.state.correctAnswer,
  wrongAnswer1: this.state.wrongAnswer1,
  wrongAnswer2: this.state.wrongAnswer2,
  wrongAnswer3: this.state.wrongAnswer3,
  imageUrl: this.state.imageUrl,
    videoUrl: this.state.videoUrl,
  audioUrl: this.state.audioUrl,

})
        
  let quizData = [];
  quizData.push({
    testFeld: this.state.testFeld,
    questionBody: this.state.questionBody,
    correctAnswer: this.state.correctAnswer,
    wrongAnswer1: this.state.wrongAnswer1,
    wrongAnswer2: this.state.wrongAnswer2,
    wrongAnswer3: this.state.wrongAnswer3,
    imageUrl: this.state.imageUrl,
    videoUrl: this.state.videoUrl,
  audioUrl: this.state.audioUrl,

  });
       
   
      const id=sessionStorage.getItem("id");
      const authToken = sessionStorage.getItem('AuthToken');
      axios.defaults.headers.common['Authorization'] = authToken ? `${authToken}` : '';
      axios
      .put(
        "https://europe-west1-fire-quizduell.cloudfunctions.net/api/question"+"/"+id,
        quizData
      )
      .then((response) => {
        swal("Questions are created sucessfully");
        this.props.history.push({
          pathname:'/ViewQuiz'
        });
        // this.history.push('/login'));
      })
      .catch((err) => {
        console.log(err);
        var errorMessage = err.response.data.message;

        swal(errorMessage);
      });
  
  
  
  
    }
    goBack(){
        this.props.history.push({
            pathname:'/ViewQuiz'
          });
     
    }
  render() {
    return (
      
              <div className="createQuestions">
                <h3>Edit Question</h3>
        
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
                    type="button"
                    className="btn btn-success"
                  
                    onClick={()=>this.updateQuestion()}
                  >
                  Update Question
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger "
                  
                    onClick={()=>this.goBack()}
                  >
                    Cancel 
                  </button>
                </form>
              </div>
            );
    
  }
}
export default EditQuiz;


