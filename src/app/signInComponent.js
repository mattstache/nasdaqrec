var React = require('react');
require('es6-promise').polyfill();
import RecommendationChart from './recommendationChartComponent.js';
//require('isomorphic-fetch');


//Create component
class SignInComponent extends React.Component{
	constructor(props, context){
		super(props, context);
		this.signIn = this.signIn.bind(this);
	}

	render(){
		let signInForm = <div><form onSubmit={this.signIn}><input type="text" ref="username" placeholder="username" /><br/><input type="password" ref="password" placeholder="password" /><button>Log in</button></form></div>;

		return(
			<div>
				{signInForm}
			</div>
		);
	} //render


	//lifecycle functions
	componentWillMount(){

	}

	signIn() {
		console.log('signin')
	}

	//load data
	componentDidMount() {
		console.log('componentDidMount')
	}

	componentWillUpdate(){

	}
};

export default SignInComponent;