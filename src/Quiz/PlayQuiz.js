
import React, { Component } from "react";
import {Button, Item, Progress } from 'semantic-ui-react';
import  { useState } from 'react';
import './question.css'
import 'semantic-ui-css/semantic.min.css'

class PlayQuiz extends Component {
  
constructor (props){

    super(props);
    
    this.state={
        userAnswer:null, //current users answer
        currentIndex:0,  //current questions index
        options: [],     //the four options
        quizEnd: false,  //determines if it's the last question
        score: 0,        //holds the score
        disabled: true, 
        percent:0,
        increment:0,
        QuizData:[]
    //score:0,
    //currentIndex:0,
    //showFinished:false,
    

    /*  Question:this.props.location.data.questionBody,
    wrongAnswer1:this.props.location.data.wrongAnswer1,
    wrongAnswer2:this.props.location.data.wrongAnswer2,
    wrongAnswer3:this.props.location.data.wrongAnswer3,
    correctAnswer:this.props.location.data.correctAnswer
    */

    }
this.loadQuestionData();

}

loadQuestionData=()=>{
     //export const QuizData

    
     for(var i in this.props.location.data) {    

        var item = this.props.location.data[i];   
    this.state.QuizData.push({ 
            id:i,
            question : item.questionBody,
            options  :[ item.wrongAnswer1,item.correctAnswer,item.wrongAnswer2,item.wrongAnswer3],
            answer       : item.correctAnswer 
        });
    }

}

loadQuiz = () => {
 
    const currentIndex = this.state.currentIndex //get the current question index
 
   
    console.log(this.state.QuizData);
    const numberOfQuestions = this.props.location.data.length;
    let incrementing = 100 /numberOfQuestions;
  this.setState( {
            increment: incrementing,
            question: this.state.QuizData[currentIndex].question,
            options :this.state.QuizData[currentIndex].options,
            answer: this.state.QuizData[currentIndex].answer          
        
    }
    )
}
nextQuestionHander = () => {
    const {userAnswer, answer, score} = this.state
   let index = this.state.currentIndex;
    index = index + 1;
  /*  this.setState({
        currentIndex: index
    });*/
   
    //Check if correct answer and increment score
    let scoring = this.state.score;
    
    if(userAnswer === answer){
     /*   this.setState({
            score: scoring
        });*/
        scoring = scoring +1 ;
    }
    let progress = this.state.percent + this.state.increment;
    this.setState( {
        currentIndex: index,
        score:scoring,
        question: this.state.QuizData[index].question,
        options :this.state.QuizData[index].options,
        answer: this.state.QuizData[index].answer,
        percent: progress          
    
}
)
    
}
checkAnswer = answer => {
    this.setState({
        userAnswer: answer,
        disabled:false
    })
}
finishHandler =() => {
    const {userAnswer, answer} = this.state;
   let scoring = this.state.score;
    if(userAnswer === answer){
           scoring = scoring +1 ;
       }
    let progress = this.state.percent + this.state.increment;
    if(this.state.currentIndex === this.state.QuizData.length -1){
        this.setState({
            percent: progress,
            score: scoring,
            quizEnd:true
        })
    }
}
load(){
    //sthis.state.this.count++;
/*this.setState({
    Question:this.props.location.data[this.state.count].questionBody,
    wrongAnswer1:this.props.location.data[this.state.count].wrongAnswer1,
    wrongAnswer2:this.props.location.data[this.state.count].wrongAnswer2,
    wrongAnswer3:this.props.location.data[this.state.count].wrongAnswer3,
    correctAnswer:this.props.location.data[this.state.count].correctAnswer

})*/



}
componentDidMount(){
this.loadQuiz();
  
}

goHome(){
    this.props.history.push({
        pathname:"/"
   
      });
}
render(){

  
   const {
        question, options, currentIndex, userAnswer, quizEnd} = this.state //get the current state
    let number = this.state.currentIndex+1;
    
   if(quizEnd) {
       return (
            <div className="Appx">
                <Progress percent={this.state.percent} indicating />
               {/* <h1>Game Over. Final score is {this.state.score} points</h1>
                <p>The correct Answers for the quiz are</p>
                
                <ul>
                    {this.state.QuizData.map((item, index) => (
                        
                        <li className='ui floating message options'
                            key={index}>
                                {item.question+"   :  "}
                                {"    "+item.answer}
                        </li>
                        
                    ))}
                     
                    </ul>*/}
                    <h1>Game Over.</h1>
                    <h2> Punktestand ist {this.state.score} Punkte</h2>
                <h3>Die korrekten Antworten zu diesem Quiz sind</h3>
                    <Item.Group link divided unstackable>
    {this.state.QuizData.map((item, index) => (
    <Item>

      <Item.Content>
        <Item.Header as='a'>{item.question}</Item.Header>
        
        <Item.Description>
        {item.answer}
        </Item.Description>
       
      </Item.Content>
    </Item>
    ))}
    <Item.Content>
        <Item.Header as='a'></Item.Header>
        <Item.Extra>
          <Button floated='right' onClick={()=>this.goHome()}className="ui  fluid yellow button">Nächstes Quiz?</Button>
        </Item.Extra>
       
      </Item.Content>
    </Item.Group>
            </div>
        )
    }
            
    return (
        <div className="Appx">
            <h2>{question}</h2>
            <span>{`Quizfrage ${number} von ${this.state.QuizData.length}`}</span>
            <Progress percent={this.state.percent} indicating />
            {options.map((option,id) => (  //for each option, new paragraph
                <p key={id}
                className={`ui fluid
                ${userAnswer === option ? "teal button" : "grey button"}
                `}
                onClick= {() => this.checkAnswer(option)}

                >
                    {option}
                </p>
            ))}
            {currentIndex < this.state.QuizData.length -1 &&
            <button 
            className="ui inverted blue button"
            disabled = {this.state.disabled}
            onClick = {this.nextQuestionHander}
                >Nächste Frage</button>
            }
                {currentIndex === this.state.QuizData.length -1 &&
                <button
                className="ui inverted yellow button"
                disabled = {this.state.disabled}
                onClick = {this.finishHandler}
                >Finish</button>
                }
        </div>
    )
}
}
export default PlayQuiz 