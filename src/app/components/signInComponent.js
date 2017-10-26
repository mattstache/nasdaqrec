var React = require('react');
//import {browserHistory} from 'react-router';
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
		let signInForm = <div><form onSubmit={this.signIn}><input type="text" ref="email" placeholder="email" /><br/><input type="password" ref="password" placeholder="password" /><button>Log in</button></form></div>;

		return(
			<div>
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
		console.log({email: $self.refs.email.value, password: $self.refs.password.value})
		fetch('/api/auth/token', { //config.apiUrl + 
			method: 'POST',
			headers: new Headers({
             'Content-Type': 'application/json', // <-- Specifying the Content-Type
    		}),
    		//credentials: 'same-origin',
    		credentials: 'include',
			body: JSON.stringify({email: $self.refs.email.value, password: $self.refs.password.value})
		})
		.then((res) => {
			if(!res.ok){ alert('An error occurred');}
			else{
				return res.json().then(function(resp){
					console.log('signin')
					console.log(resp)
					console.log(resp.headers)
					console.log('document.cookie')
					console.log(document.cookie)
					//localStorage.token = result.token;
					 //window.location = '/portfolio';
					 //$self.props.history.push("/");

					//browserHistory.replace("/")
				})
			}


			// return res.json().then(function(json) {
			// 	console.log(json)
			// 	// $self.GetStocks(function(symbols){
			// 	// 	$self.setState({symbols: symbols});
			// 	// })

			// 	// $self.refs.symbol.value = "";
			// 	//this.props.history.push({pathname: '/'})
			// });
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