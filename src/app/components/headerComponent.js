var React = require('react');
//import  { Redirect } from 'react-router-dom'
import  { Redirect } from 'react-router';
require('es6-promise').polyfill();
const config = require('../model/config');
//require('isomorphic-fetch');


//Create component
class HeaderComponent extends React.Component{
	constructor(props, context){
		super(props, context);
		this.signOut = this.signOut.bind(this);
	}

	render(){
		let signOutButton = <div><button onClick={this.signOut}>Sign out</button></div>;

		return(
			<div>
				{signOutButton}
			</div>
		);
	} //render


	//lifecycle functions
	componentWillMount(){

	}

	signOut(e) {
		e.preventDefault();
		console.log('signOut');
		var $self = this;


		fetch('/api/auth/signout', {//config.apiUrl + 
			method: 'POST',
			headers: new Headers({
             	'Accept':  'application/json',
       			'Content-Type': 'application/json',
       			'Cache': 'no-cache'
    		}),
    		//credentials: 'same-origin',
    		credentials: 'include'
		})
		.then((res) => {
			if(!res.ok){ alert('An error occurred');}
			else{
				$self.props.history.push("/portfolio");
				//return <Redirect to='/signin'  />;
				// return res.json().then(function(resp){
				// 	//history.push('/portfolio')
					
				// })
			}
		});








		// fetch(config.apiUrl + '/api/user', {
		// 	method: 'POST',
		// 	headers: new Headers({
  //            'Content-Type': 'application/json', // <-- Specifying the Content-Type
  //   		}),
		// 	body: JSON.stringify({
		// 		email: this.refs.email.value,
		// 		password: this.refs.password.value
		// 	})
		// })
		// .then((data) => {
		// 	return data.json().then(function(json) {
		// 		console.log('finished signup')
		// 		console.log(json)
		// 	});
		// });
	}

};

export default HeaderComponent;