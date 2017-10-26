var React = require('react');
var ReactDom = require('react-dom');
// const mongoose = require('mongoose');
const config = require('./model/config');
import {Router, Route, browserHistory, Link} from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory'
const newHistory = createBrowserHistory();

//Styles
require('./scss/index.scss');
//require('./css/index.css');

//Module requires
import PortfolioComponent from './components/portfolioComponent';
import RecommendationComponent from './components/recommendationComponent';
import SignInComponent from './components/signInComponent';
import SignUpComponent from './components/signUpComponent';

const PrivateRoute = ({ component: Component }) => (
  <Route render={props => (
    isAuthenticated() ? (   //true needs to check if authenticated //isAuthenticated() 
      <Component />
    ) : (
      <SignInComponent/>
    )
  )}/>
)

export default class App extends React.Component {
	render(){
		return(
			<Router history={newHistory}>
				<div>
					<Route exact path={'/'} component={RecommendationComponent}></Route>
					
					<Route exact path={'/signin'} component={SignInComponent}></Route>
					<Route exact path={'/signup'} component={SignUpComponent}></Route>

					<PrivateRoute path="/portfolio" component={PortfolioComponent}/>
				</div>
			</Router>
		);
	}
};

const isAuthenticated = () => {
	console.log('CheckAuth');
	fetch(config.apiUrl + '/api/auth/validate', {
		method: 'GET',
		headers: new Headers({
         'Content-Type': 'application/json', // <-- Specifying the Content-Type
		}),
		//credentials: 'include',
		//body: JSON.stringify({ localStorage.token})
	})
	.then((data) => {
		return data.json().then(function(json) {
			console.log('response checkauth')
			console.log(json)
			return json.isAuthenticated;
		});
	});
};


//put component into html page
ReactDom.render(<App />, document.getElementById('todo-wrapper'));

