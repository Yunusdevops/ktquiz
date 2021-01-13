import React, {Component} from 'react'
import firebase from "firebase";
import axios from 'axios';



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
			loading: false
		};
    }

     signUp() {
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((u) => {
          console.log('Successfully Signed Up');
        })
        .catch((err) => {
          console.log('Error: ' + err.toString());
        })
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
		this.setState({ loading: true });
		const newUserData = {
			email: this.state.email,
			password: this.state.password,
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
        .post('/signup', newUserData)
        .then((response) => {
            localStorage.setItem('AuthToken', `${response.data.token}`);
            this.setState({ 
                loading: false,
            });	
      
  
           // this.history.push('/login'));
        })
        .catch((error) => {
            this.setState({
                errors: error.response.data,
                loading: false
               
            });
            console.log(error);
        });
};
render(){
    return( <form>
        <div className="Signup">
        <h3>Sign Up</h3>

        <div className="form-group">
            <label>Email</label>
            <input type="email" className="form-control" defaultValue={this.state.email} name="email" id="email" placeholder="email" onChange={this.handleChange}/>
        </div>

        <div className="form-group">
            <label>Password</label>
            <input type="password" name="password"defaultValue={this.state.password} id="password" className="form-control" placeholder="password"onChange={this.handleChange}  />
        </div>

        <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" defaultValue={this.state.confirmPassword} id="confirmPassword" className="form-control" placeholder="Confirm Password" onChange={this.handleChange}/>
        </div>

        <div className="form-group">
            <label>Username</label>
            <input type="text" className="form-control"defaultValue={this.state.displayName} name="displayName" id="displayName" placeholder="Username" onChange={this.handleChange}/>
        </div>
        <div className="form-group">
            <label>Name</label>
            <input type="text" className="form-control" defaultValue={this.state.name} name="name" id="name" placeholder="name" onChange={this.handleChange}/>
        </div>
        <div className="form-group">
            <label>Surname</label>
            <input type="text" className="form-control" defaultValue={this.state.surname} name="surname" id="surname" placeholder="surname" onChange={this.handleChange}/>
        </div>
        <div className="form-group">
            <label>Name of Organization</label>
            <input type="text" className="form-control" defaultValue={this.state.nameOfOrga}name="nameOfOrga" id="nameOfOrga" placeholder="Name of Organization" onChange={this.handleChange}/>
        </div>
        <div className="form-group">
            <label>Street of the Organization</label>
            <input type="text" className="form-control" defaultValue={this.state.adressOfOrgaStreet} name="adressOfOrgaStreet" id="adressOfOrgaStreet" placeholder="Street of Organization" onChange={this.handleChange}/>
        </div>
        <div className="form-group">
            <label>City of the Organization</label>
            <input type="text" className="form-control" defaultValue={this.state.adressOfOrgaCity}name="adressOfOrgaCity" id="adressOfOrgaCity" placeholder="City of Organization" onChange={this.handleChange}/>
        </div>
        <div className="form-group">
            <label>Postalcode of the Organization</label>
            <input type="text" className="form-control" defaultValue={this.state.adressOfOrgaPostalCode} name="adressOfOrgaPostalCode" id="adressOfOrgaCityPostalCode" placeholder="Postalcode of Organization" onChange={this.handleChange}/>
        </div>




        <button className="btn btn-primary btn-block "
							type="submit"
							onClick={this.handleSubmit}
                            >
							Sign Up
						</button>
        <p className="forgot-password text-right">
         Schon registriert? <a href="/login">Sign in?</a>
        </p>
        </div>
    </form>)
}

}   
    
    



export default signup