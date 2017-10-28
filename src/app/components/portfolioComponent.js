var React = require('react');

import RecommendationComponent from './recommendationComponent';
import SignInComponent from './signInComponent';

//Create PortfolioComponent
class PortfolioComponent extends React.Component{
	constructor(){
        super();
    }

    componentWillMount() {
        const self = this;


        console.log('isAuthenticated');
		console.log(document.cookie)
		fetch('/api/auth/validate', {//config.apiUrl + 
			method: 'GET',
			headers: new Headers({
	         'Content-Type': 'application/json', // <-- Specifying the Content-Type
			}),
			credentials: 'include',
		})
		.then((data) => {
			return data.json().then(function(json) {
				console.log('componentDidMount server response: ' + json.isAuthenticated)
				console.log(json)
				self.setState({ user: json.user, loggedin: json.isAuthenticated });
				//return json.isAuthenticated;
			});
		});
    }

	render(){
		let component = <SignInComponent />;
		if(this.state && this.state.loggedin){
			component = <RecommendationComponent />;
		}
		return(
			<div>
				Portfolio

				{component}
                
			</div>
		);
	}


};

export default PortfolioComponent;