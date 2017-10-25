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
		fetch(config.apiUrl + '/api/auth/token', {
			method: 'POST',
			headers: new Headers({
             'Content-Type': 'application/json', // <-- Specifying the Content-Type
    		}),
			body: JSON.stringify({email: $self.refs.email.value, password: $self.refs.password.value})
		})
		.then((res) => {
			if(!res.ok){ alert('An error occurred');}
			else{
				return res.json().then(function(result){
					console.log('signin')
					console.log(result)
					localStorage.token = result.token;
					 $self.props.history.push("/");

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