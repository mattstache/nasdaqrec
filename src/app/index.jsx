var React = require('react');
var ReactDom = require('react-dom');
// const mongoose = require('mongoose');
const config = require('./model/config');
import {Router, Route, browserHistory, Link, Redirect, Switch} from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory'
const newHistory = createBrowserHistory();
//var auth = require('./controllers/auth.controller.js');

//Styles
require('./scss/index.scss');
//require('./css/index.css');

//Module requires
import PortfolioComponent from './components/portfolioComponent';
import RecommendationComponent from './components/recommendationComponent';
import SignInComponent from './components/signInComponent';
import SignUpComponent from './components/signUpComponent';
import NotFoundPage from './components/NotFoundPage';

import PrivateRoute from './privateRoute';



export default class App extends React.Component {
	render(){
		return(
			<Router history={newHistory}>
				<div>
				<Switch>
					<PrivateRoute exact path={'/'} component={PortfolioComponent} />
					<Route exact path={'/signin'} component={SignInComponent}></Route>
					<Route exact path={'/signup'} component={SignUpComponent}></Route>
					
					<PrivateRoute path="/portfolio" component={PortfolioComponent}/>
					<Route component={NotFoundPage} />
					</Switch>
				</div>
			</Router>
		);
	}
};

//<Route exact path={'/portfolio'} component={PortfolioComponent}></Route>

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={props => (
//     auth.isAuthenticated ? (
//       <Component {...props}/>
//     ) : (
//       <Redirect to={{
//         pathname: '/signin',
//         state: { from: props.location }
//       }}/>
//     )
//   )}/>
// )

// const auth = {
//   isAuthenticated: false,
//   authenticate(cb) {
//     this.isAuthenticated = true
//     setTimeout(cb, 100) // fake async
//   },
//   signout(cb) {
//     this.isAuthenticated = false
//     setTimeout(cb, 100)
//   }
// }


const loggedIn = () => 
{
	console.log('loggedIn()');
	// console.log(document.cookie)

	// //<PrivateRoute path="/portfolio" component={PortfolioComponent}/>

	// fetch('/api/auth/validate', {//config.apiUrl + 
	// 	method: 'GET',
	// 	headers: new Headers({
 //         'Content-Type': 'application/json', // <-- Specifying the Content-Type
	// 	}),
	// 	credentials: 'include',
	// })
	// .then((data) => {
	// 	return data.json().then(function(json) {
	// 		console.log('isAuthenticated server response: ' + json.isAuthenticated)
	// 		return json.isAuthenticated;
	// 	});
	// });
};

//put component into html page
ReactDom.render(<App />, document.getElementById('todo-wrapper'));

