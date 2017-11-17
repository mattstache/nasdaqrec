var React = require('react');
import  { Redirect } from 'react-router';

import RecommendationComponent from './recommendationComponent';
import SignInComponent from './signInComponent';
import Header from './headerComponent.js';

//Create PortfolioComponent
class PortfolioComponent extends React.Component{
	static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

	constructor(props, context){
        super(props, context);
        this.signOut = this.signOut.bind(this);
    }

	render(){
		const $self = this;
		let component = <RecommendationComponent />;//<SignInComponent />;
		let signOutButton = <button onClick={this.signOut} className="sign-out-element">Sign out <i className="fa fa-sign-out"/></button>;

		return(
			<div>
				{signOutButton}

				{component}
			</div>
		);
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
				console.log('redirect after signout')
				$self.context.router.history.push('/signin')
				//$self.props.history.push("/portfolio");
				//return <Redirect to='/signin'  />;
			}
		});
	}


};

export default PortfolioComponent;