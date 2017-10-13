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
import RecommendationComponent from './recommendationComponent';
import SignInComponent from './signInComponent';

export default class App extends React.Component {
	render(){
		return(
			<Router history={newHistory}>
				<div>
					<Route exact path={'/'} component={RecommendationComponent}></Route>
					<Route exact path={'/user/signin'} component={SignInComponent}></Route>
				</div>
			</Router>
		);
	}
};


//put component into html page
ReactDom.render(<App />, document.getElementById('todo-wrapper'));

