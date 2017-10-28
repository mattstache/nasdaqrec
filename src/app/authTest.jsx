import React from 'react'
import {
  Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
const newHistory = createBrowserHistory();

import PortfolioComponent from './components/portfolioComponent';
import RecommendationComponent from './components/recommendationComponent';
import SignInComponent from './components/signInComponent';
import SignUpComponent from './components/signUpComponent';

const AuthTest = () => (
	<Router history={newHistory}>
				<div>
					<Route exact path={'/'} component={RecommendationComponent}></Route>
					
					<Route exact path={'/signin'} component={SignInComponent}></Route>
					<Route exact path={'/signup'} component={SignUpComponent}></Route>

					

					

					

					<PrivateRoute path="/portfolio" component={PortfolioComponent}/>

					
					
				</div>
			</Router>
)

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    loggedIn() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/signin',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

    const loggedIn = (nextState, replace) => {
	console.log('loggedIn')

	//console.log(document.cookie)
	fetch('/api/auth/validate', {//config.apiUrl + 
		method: 'GET',
		headers: new Headers({
         'Content-Type': 'application/json', // <-- Specifying the Content-Type
		}),
		credentials: 'include',
		//body: JSON.stringify({ localStorage.token})
	})
	.then((data) => {
		data.json().then(function(json) {
			console.log('json.isAuthenticated: ' + json.isAuthenticated)

			return json.isAuthenticated;
			// if(json.isAuthenticated){
			// 	// replace({
			//  //      pathname: '/signin',
			//  //      state: { nextPathname: nextState.location.pathname }
			//  //    })	
			//  	return PortfolioComponent;
			// }else{
			// 	return SignInComponent;
			// }
			
			//return json.isAuthenticated;
		});
	});


};

export default AuthTest