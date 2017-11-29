var React = require('react');
//import {browserHistory} from 'react-router';
import  { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
require('es6-promise').polyfill();
const config = require('../model/config');
import RecommendationChart from './recommendationChartComponent.js';



//Create component
class SignInComponent extends React.Component{
	constructor(props, context){
		super(props, context);
		this.signIn = this.signIn.bind(this);
	}

	render(){
		let signInForm = <div className="absolute-center padded-page">
			<form className="page-form" onSubmit={this.signIn}>
				<span className="page-form__header">Log in</span>
				<span className="page-form__description">or <Link to={'/signup'} className="link">Sign up</Link> for a new account</span>
				<input type="text" ref="email" placeholder="Email" className="text-input" autoFocus="true" />
				<input type="password" ref="password" placeholder="Password" className="text-input" />
				<button className="button button--submit">Log in</button>
			</form>
			</div>;

		return(
			<div className="fullpage-wrapper">
				{signInForm}
			</div>
		);
	} //render


	//lifecycle functions
	componentWillMount(){

	}

	signIn(e) {
		e.preventDefault();
		console.log('signin')
		var $self = this;
		//const { history } = this.props;
		console.log({email: $self.refs.email.value, password: $self.refs.password.value})
		fetch('/api/auth/token', {//config.apiUrl + 
			method: 'POST',
			headers: new Headers({
             	'Accept':  'application/json',
       			'Content-Type': 'application/json',
       			'Cache': 'no-cache'
    		}),
    		//credentials: 'same-origin',
    		credentials: 'include',
			body: JSON.stringify({email: $self.refs.email.value, password: $self.refs.password.value})
		})
		.then((res) => {
			if(!res.ok){ alert('A sign in error occurred');}
			else{
				console.log('redirect to portfolio')
				this.props.history.push("/portfolio");
			}
		});
	}

	//load data
	componentDidMount() {
		console.log('componentDidMount')
	}

	componentWillUpdate(){

	}
};

export default SignInComponent;