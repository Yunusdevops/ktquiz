import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
var firebaseConfig ={
    apiKey: "AIzaSyBUXNmZ7OCxQAhTUZKPkLyLO8sWn2-PmRE",
    authDomain: "fire-quizduell.firebaseapp.com",
    projectId: "fire-quizduell",
    storageBucket: "fire-quizduell.appspot.com",
    messagingSenderId: "11323579019",
    appId: "1:11323579019:web:134084970adf9a43bad28e",
    measurementId: "G-1N8WP0X5CV"
};
const fire =firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.auth()

export default {
  fire, 
}