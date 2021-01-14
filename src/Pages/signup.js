import React, {Component} from 'react'

import axios from 'axios';
import {FormErrors} from "../Validation/FormError"
import  { Redirect } from 'react-router-dom'
import ReactDom from 'react-dom';
import swal from 'sweetalert';
import { ThreeSixtySharp, ThreeSixtyTwoTone } from '@material-ui/icons';
class signup extends Component{

    constructor(props) {
		super(props);

		this.state = {
            
            email: '',
            password: '',
            confirmPassword: '',
            displayName: '',
            name: '',
            surname:'',
            nameOfOrga:'',
            adressOfOrgaStreet:'',
            adressOfOrgaCity:'',
            adressOfOrgaPostalCode:'',
            errors: [],
            formErrors: {email: '', password: '',
             confirmPassword:'', displayName:'', name:'', surname:'', nameOfOrga:'', adressOfOrgaStreet:'',
             adressOfOrgaCity:'',adressOfOrgaPostalCode:'' 
       
             
       
            },
            emailValid: false,
            passwordValid: false,
            confirmPasswordValid:false,
            displayNameValid:false,
            nameValid:false,
            surnameValid:false,
            nameOfOrgaValid:false,
            adressOfOrgaStreetValid:false,
            adressOfOrgaCityValid:false,
            adressOfOrgaPostalCodeValid:false,
            formValid: false
	
		};
    }
    handleUserInput = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({[name]: value},
                    () => { this.validateField(name, value) });
    }
      validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
       let confirmPasswordValid=this.state.confirmPasswordValid;
       let displayNameValid=this.state.displayNameValid;
        let nameValid=this.state.nameValid;
        let surnameValid=this.state.surnameValid;
      let  nameOfOrgaValid=this.state.nameOfOrgaValid;
      let  adressOfOrgaStreetValid=this.state.adressOfOrgaStreetValid;
       let adressOfOrgaCityValid=this.state.adressOfOrgaCityValid;

       let adressOfOrgaPostalCodeValid=this.state.adressOfOrgaPostalCodeValid;

    
        switch(fieldName) {
          case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' is invalid';
            break;
          case 'password':
            passwordValid = value.length >= 6;
            fieldValidationErrors.password = passwordValid ? '': ' is too short';
            break;
          
            case'displayName','name','surname','nameOfOrga','adressOfOrgaStreet','adressOfOrgaCity','adressOfOrgaPostalCode':
            if(displayNameValid===''|| nameValid===''|| surnameValid===''||nameOfOrgaValid===''|| adressOfOrgaStreetValid===''|| adressOfOrgaCityValid===''|| adressOfOrgaPostalCodeValid==='' ){
                fieldValidationErrors.displayName =displayNameValid ? '': 'Shouldnt be empty';
                fieldValidationErrors.name =nameValid ? '': 'Shouldnt be empty';
                fieldValidationErrors.surname =surnameValid? '': 'Shouldnt be empty';
                fieldValidationErrors.nameOfOrga =nameOfOrgaValid ? '': 'Shouldnt be empty';
                fieldValidationErrors.adressOfOrgaStreet =adressOfOrgaStreetValid ? '': 'Shouldnt be empty';
                fieldValidationErrors.adressOfOrgaCity =adressOfOrgaCityValid ? '': 'Shouldnt be empty';
                fieldValidationErrors.adressOfOrgaPostalCode=adressOfOrgaPostalCodeValid ? '': 'Shouldnt be empty';
            }
            break;
            case'adressOfOrgaPostalCode':
            adressOfOrgaPostalCodeValid= value.length === 5;
                fieldValidationErrors.adressOfOrgaPostalCode=adressOfOrgaPostalCodeValid ? '': 'Not a valid Postal-Code adress' ;
           
            break;

          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        emailValid: emailValid,
                        passwordValid: passwordValid,
                        confirmPasswordValid: confirmPasswordValid,
                        displayNameValid:displayNameValid,
                        nameValid:nameValid,
                        surnameValid:surnameValid,
                        nameOfOrgaValid:nameOfOrgaValid,
                        adressOfOrgaStreetValid: adressOfOrgaStreetValid,
                        adressOfOrgaCityValid:adressOfOrgaCityValid,
                        adressOfOrgaPostalCodeValid:adressOfOrgaPostalCodeValid
                      }, this.validateForm);
      }
    
      validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid && 
        this.state.confirmPasswordValid && this.state.confirmPasswordValid && this.state.displayNameValid && this.state.nameValid
        && this.state.surnameValid && this.state.nameOfOrgaValid && this.state.adressOfOrgaStreetValid && this.state.adressOfOrgaCityValid && this.state.adressOfOrgaPostalCodeValid
        });
   
      }
    
      errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
      }
 
    componentWillReceiveProps(nextProps) {
		if (nextProps.UI.errors) {
			this.setState({
				errors: nextProps.UI.errors
			});
		}
	}

    
    
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};
   
	handleSubmit = (event) => {
       
		event.preventDefault();


		const newUserData = {
			
            email: this.state.email,
            password:this.state.password,
            confirmPassword: this.state.confirmPassword,
            displayName: this.state.displayName,
            name: this.state.name,
            surname:this.state.surname,
            nameOfOrga: this.state.nameOfOrga,
            adressOfOrgaStreet: this.state.adressOfOrgaStreet,
            adressOfOrgaCity: this.state.adressOfOrgaCity,
            adressOfOrgaPostalCode: this.state.adressOfOrgaPostalCode,



        };  
        axios
        .post('https://europe-west1-fire-quizduell.cloudfunctions.net/api/signup', newUserData)
        .then((response) => {
            localStorage.setItem('AuthToken', `${response.data.token}`);
           
           swal("User Created sucessfully ");
           return <Redirect to='/login'  />
           // this.history.push('/login'));
        })
        .catch((err) => {
      
          
           var errorMessage = err.response.data.message;
       
       
        swal(errorMessage);
         
        
        });
};
render(){
 
 
    
    return( 
    
    

       
        <div className="Signup">

        <h3>Sign Up</h3>
        <form>
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
          
        </div>
    
        
        <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
        <div className="form-group">
            <label>Email</label>
            <input type="email" defaultValue={this.state.email}
            onChange={this.handleUserInput}  className="form-control"  name="email" id=" email" placeholder="email" />
        </div>
</div>


<div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
        <div className="form-group">
            <label>Password</label>
            <input type="password" defaultValue={this.state.password}
            onChange={this.handleUserInput}   name="password" id=" password" className="form-control" placeholder="password"  />
        </div>
</div>
        
<div className={`form-group ${this.errorClass(this.state.formErrors.confirmPassword)}`}>
        <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" defaultValue={this.state.confirmPassword}
            onChange={this.handleUserInput}  name="confirmPassword"  id="confirmPassword" className="form-control" placeholder="confirmPassword" />
        </div>
</div>

<div className={`form-group ${this.errorClass(this.state.formErrors.displayName)}`}>
        <div className="form-group">
            <label>Username</label>
            <input type="text"   defaultValue={this.state.displayName}
            onChange={this.handleUserInput} className="form-control" name="displayName" id="displayName" placeholder="Username" />
        </div>
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.name)}`}>
        <div className="form-group">
            <label>Name</label>
            <input type="text" defaultValue={this.state.name}
            onChange={this.handleUserInput}  className="form-control"  name="name" id=" name" placeholder="name" />
        </div>
</div>

<div className={`form-group ${this.errorClass(this.state.formErrors.surname)}`}>
        <div className="form-group">
            <label>Surname</label>
            <input type="text" defaultValue={this.state.surname}
            onChange={this.handleUserInput}  className="form-control"  name="surname" id="surname" placeholder="surname" />
        </div>

        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.nameOfOrga)}`}>
        <div className="form-group">
            <label>Name of Organization</label>
            <input type="text" defaultValue={this.state.nameOfOrga}
            onChange={this.handleUserInput}  className="form-control"name="nameOfOrga" id=" nameOfOrga" placeholder="Name of Organization"/>
        </div>
</div>
<div className={`form-group ${this.errorClass(this.state.formErrors.adressOfOrgaStreet)}`}>
        <div className="form-group">
            <label>Street of the Organization</label>
            <input type="text"defaultValue={this.state.adressOfOrgaStreet}
            onChange={this.handleUserInput}  className="form-control"  name="adressOfOrgaStreet" id="adressOfOrgaStreet" placeholder="Street of Organization" />
        </div>
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.adressOfOrgaCity)}`}>
        <div className="form-group">
            <label>City of the Organization</label>
            <input type="text"  defaultValue={this.state.adressOfOrgaCity}
            onChange={this.handleUserInput} className="form-control" name="adressOfOrgaCity" id="adressOfOrgaCity" placeholder="City of Organization" />
        </div>
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.adressOfOrgaPostalCode)}`}>
        <div className="form-group">
            <label>Postalcode of the Organization</label>
            <input type="text" defaultValue={this.state.adressOfOrgaPostalCode}
            onChange={this.handleUserInput}   className="form-control"  name="adressOfOrgaPostalCode" id="adressOfOrgaPostalCode" placeholder="Postalcode of Organization" />
        </div>
    </div>

     
        <button className="btn btn-primary btn-block "
							type="submit"
							onClick={this.handleSubmit}
                            >
							Sign Up
						</button>
                        </form>
        <p className="forgot-password text-right">
         Schon registriert? <a href="/login">Sign in?</a>
        </p>
        </div>
   )
}

}   
    
    



export default signup