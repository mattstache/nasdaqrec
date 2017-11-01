var React = require('react');
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
		let signOutButton = <div><button onClick="">Sign out</button></div>;

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