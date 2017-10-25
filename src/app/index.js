var React = require('react');
var ReactDom = require('react-dom');
// const mongoose = require('mongoose');
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
    true ? (   //true needs to check if authenticated
      <Component />
    ) : (
      <SignInComponent/>
    )
  )}/>
)

// <PrivateRoute path="/portfolio" component={PortfolioComponent}/>

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


//put component into html page
ReactDom.render(<App />, document.getElementById('todo-wrapper'));

