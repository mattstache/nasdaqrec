var React = require('react');
const config = require('../model/config');
require('es6-promise').polyfill();
import RecommendationChart from './recommendationChartComponent.js';
//require('isomorphic-fetch');


//Create component
class RecommendationComponent extends React.Component{
	constructor(props, context){
		super(props, context);
		this.state = {'symbols': []};
		this.addSymbol = this.addSymbol.bind(this);
		this.onDeleteStock = this.onDeleteStock.bind(this);
	}

	render(){
		var listStyle = {
			display: 'flex',
			flexWrap: 'wrap'
		}

		let reccEl = this.state.symbols.map(function(symbol, index){
			console.log('symbol: '  + symbol)
			return(
				<RecommendationChart key={index} stock={symbol} onDeleteStock={this.onDeleteStock} />
			)
		}.bind(this));

		let addSymbolForm = <div><form onSubmit={this.addSymbol}><input type="text" ref="symbol" /><button>Add symbol</button></form></div>;

		return(
			<div>
				{addSymbolForm}
				<div style={listStyle}>
					{reccEl}
				</div>
			</div>
		);
	} //render


	addSymbol(e){
		e.preventDefault();
		let $self = this;
		let symbol = this.refs.symbol.value;

		console.log('form')
		console.log(config.apiUrl)
		fetch(config.apiUrl + '/api/stock/add', {
			method: 'POST',
			headers: new Headers({
             'Content-Type': 'application/json', // <-- Specifying the Content-Type
    		}),
			body: JSON.stringify({symbol: symbol})
		})
		.then((data) => {
			return data.json().then(function(json) {
				$self.GetStocks(function(symbols){
					$self.setState({symbols: symbols});
				})

				$self.refs.symbol.value = "";
			});
		});
	}

	onDeleteStock(stock){
		let $self = this;
		//let stock = this.props.stock;

		console.log('onDeleteStock')
		//console.log(this.props)
		console.log(stock)
		fetch(config.apiUrl + '/api/stock/' + stock._id, {
			method: 'DELETE',
			headers: new Headers({
             'Content-Type': 'application/json', // <-- Specifying the Content-Type
    		}),
			body: JSON.stringify({stockId: stock._id})
		})
		.then((data) => {
			console.log('client updated stock 1')
			return data.json().then(function(stock) {
				console.log('client updated stock')
				$self.GetStocks(function(symbols){
					$self.setState({symbols: symbols});
				})
			});
		});
	}

	//lifecycle functions
	componentWillMount(){

	}

	//load data
	componentDidMount() {
		console.log('componentDidMount')
		var $self = this;
		this.GetStocks(function(symbols){
			$self.setState({symbols: symbols});
		});
	}

	GetStocks(callback) {
		console.log('get lists')
		let symbols = [];

		fetch('/api/stock/all', {
			credentials: 'include',
		})
		.then((data) => {
			return data.json().then(function(json) {
				console.log('----GETSTOCKS----')
				console.log(json)

				// for (var i = 0, len = json.length; i < len; i++) {
				//   symbols.push(json[i].symbol);
				// }

				symbols = json;

				console.log(symbols)

				callback(json);
			});
		});
	}

	componentWillUpdate(){

	}
};

export default RecommendationComponent;