var React = require('react');
require('es6-promise').polyfill();
const config = require('../model/config');
//require('isomorphic-fetch');


//Create component
class SignUpComponent extends React.Component{
	constructor(props, context){
		super(props, context);
		this.signUp = this.signUp.bind(this);
	}

	render(){
		let signUpForm = <div><form onSubmit={this.signUp}><input type="text" ref="email" placeholder="email" /><br/><input type="password" ref="password" placeholder="password" /><button>Sign up</button></form></div>;

		return(
			<div>
				{signUpForm}
			</div>
		);
	} //render


	//lifecycle functions
	componentWillMount(){

	}

	signUp(e) {
		e.preventDefault();
		console.log('signup');
		console.log(this.refs.email.value + " : " + this.refs.password.value)
		fetch(config.apiUrl + '/api/user', {
			method: 'POST',
			headers: new Headers({
             'Content-Type': 'application/json', // <-- Specifying the Content-Type
    		}),
			body: JSON.stringify({
				email: this.refs.email.value,
				password: this.refs.password.value
			})
		})
		.then((data) => {
			return data.json().then(function(json) {
				console.log('finished signup')
				console.log(json)
			});
		});
	}

	//load data
	componentDidMount() {
		console.log('componentDidMount')
	}

	componentWillUpdate(){

	}
};

export default SignUpComponent;