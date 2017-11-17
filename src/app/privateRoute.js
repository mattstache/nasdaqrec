var React = require('react');
import {Router, Route, browserHistory, Link, Redirect} from 'react-router';

class PrivateRoute extends React.Component {
  	constructor(props, context){
		super(props, context);
		this.state = {
			loading: true,
			isAuthenticated: false,
		}
	}

  componentDidMount() {
  	var self = this;
  	fetch('/api/auth/validate', {//config.apiUrl + 
		method: 'GET',
		headers: new Headers({
         'Content-Type': 'application/json', // <-- Specifying the Content-Type
		}),
		credentials: 'include',
	})
	.then((data) => {
		data.json().then(function(json) {
			self.setState({
		        loading: false,
		        isAuthenticated: json.isAuthenticated,
		      });
		});
	});
  }

  render() {
    const { component: Component, ...rest } = this.props;
    if (this.state.loading) {
      return <div>LOADING</div>;
    } else {
      return (
        <Route {...rest} render={props => (
          <div>
            {!this.state.isAuthenticated && <Redirect to={{ pathname: '/signin', state: { from: this.props.location } }} />}
            {this.state.isAuthenticated && <Component {...this.props} />}
          </div>
          )}
        />
      )
    }
  }
}

module.exports = PrivateRoute;