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
		let reccEl = this.state.symbols.map(function(symbol, index){
			console.log('symbol: '  + symbol)
			return(
				<RecommendationChart key={index} stock={symbol} onDeleteStock={this.onDeleteStock} />
			)
		}.bind(this));

		let addSymbolForm = <div><form onSubmit={this.addSymbol} className="new-symbol-form"><input type="text" ref="symbol" className="text-input" placeholder="Enter a symbol" /><button className="button button--submit">Add to list</button></form></div>;

		return(
			<div className="padded-page">
				{addSymbolForm}
				<div className="portfolio-list">
					{reccEl}
				</div>
			</div>
		);
	} //render


	addSymbol(e){
		e.preventDefault();
		let $self = this;
		let symbol = this.refs.symbol.value;

        fetch('/api/stock/add', {
			method: 'POST',
			headers: new Headers({
             'Content-Type': 'application/json', // <-- Specifying the Content-Type
    		}),
    		credentials: 'include',
			body: JSON.stringify({symbol: symbol})
		})
		.then((data) => {
			console.log(data)
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

		fetch('/api/stock/' + stock._id, {
			method: 'DELETE',
			headers: new Headers({
             'Content-Type': 'application/json', // <-- Specifying the Content-Type
    		}),
    		credentials: 'include',
			body: JSON.stringify({stock: stock})
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
		var $self = this;
		this.GetStocks(function(symbols){
			$self.setState({symbols: symbols});
		});
	}

	GetStocks(callback) {
		let symbols = [];

		fetch('/api/stock/all', {
			credentials: 'include',
		})
		.then((data) => {
			return data.json().then(function(json) {
				symbols = json;

				callback(json);
			});
		});
	}

	componentWillUpdate(){

	}
};

export default RecommendationComponent;