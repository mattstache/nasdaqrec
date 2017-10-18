var React = require('react');
require('es6-promise').polyfill();
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

	signUp() {
		console.log('signin')
	}

	//load data
	componentDidMount() {
		console.log('componentDidMount')
	}

	componentWillUpdate(){

	}
};

export default SignUpComponent;