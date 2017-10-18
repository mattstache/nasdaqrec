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
import RecommendationComponent from './components/recommendationComponent';
import SignInComponent from './components/signInComponent';
import SignUpComponent from './components/signUpComponent';

export default class App extends React.Component {
	render(){
		return(
			<Router history={newHistory}>
				<div>
					<Route exact path={'/'} component={RecommendationComponent}></Route>
					<Route exact path={'/signin'} component={SignInComponent}></Route>
					<Route exact path={'/signup'} component={SignUpComponent}></Route>
				</div>
			</Router>
		);
	}
};


//put component into html page
ReactDom.render(<App />, document.getElementById('todo-wrapper'));

