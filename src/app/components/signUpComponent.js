var React = require('react');
require('es6-promise').polyfill();
const config = require('../model/config');
//require('isomorphic-fetch');


//Create component
class SignUpComponent extends React.Component{

	static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

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
		var self = this;
		console.log(this.refs.email.value + " : " + this.refs.password.value)
		fetch('/api/user', {
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
			console.log(data)
			//self.props.history.push("/portfolio");

			



			return data.json().then(function(json) {
				console.log('finished signup')
				console.log(json)

				fetch('/api/auth/token', {//config.apiUrl + 
					method: 'POST',
					headers: new Headers({
		             	'Accept':  'application/json',
		       			'Content-Type': 'application/json',
		       			'Cache': 'no-cache'
		    		}),
		    		//credentials: 'same-origin',
		    		credentials: 'include',
					body: JSON.stringify({email: self.refs.email.value, password: self.refs.password.value})
				})
				.then((res) => {
					if(!res.ok){ alert('A sign in error occurred');}
					else{
						console.log('redirect to portfolio')
						//this.props.history.push("/portfolio");
						self.context.router.history.push('/portfolio');
					}
				});
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