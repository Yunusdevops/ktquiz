import React, {Component,useState} from "react"
import firebase from "firebase";
class Resetpassword extends Component{
    constructor(props){
        super(props)
        this.state1={
          email: '',
         
    }
}
    resetpw(){
  
        var emailAddress = document.querySelector('#email').value;
     
        firebase.auth().sendPasswordResetEmail(emailAddress).then(function() {
         alert("Email versendet");
         console.log(emailAddress);
        }).catch(function(error) {
          alert(error);
        });
        

    }
    render(){
        return(
            <form>
        <div className="form-group">
        <label>Email address</label>
        <input type="email" id="email" defaultValue={this.state1.email}  name="email" className="form-control" 
            placeholder="Email .. "
        />
    </div>   

<button  className="btn btn-primary btn-block "   onClick={this.resetpw} >Passwort zurücksetzen</button>
</form>
    );
    }
}
export default Resetpassword;