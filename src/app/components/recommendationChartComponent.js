var React = require('react');

//Create todoitem component
class RecommendationChartComponent extends React.Component{
	constructor(){
        super();
        this.delete = this.delete.bind(this);
    }

	render(){
		var reccStyle = {
			fontWeight: "bold",
			textAlign: 'center',
			boxShadow: '1px 1px 3px 0px rgba(142, 142, 142, 0.29)',
			margin:'10px',
			background:'#fff',
			padding: '5px',
			borderRadius: '3px'
			// background: 'blue'
			//float: 'left'
		};

		//<br/><img src={'http://www.nasdaq.com/charts/' + this.props.stock.symbol + '_per.jpeg'} />

		return(
			<div key={this.props.stock._id} className="card">
				<div><a target='_blank' href={'http://www.nasdaq.com/symbol/' + this.props.stock + '/recommendations'}>{this.props.stock}</a> <button onClick={this.delete}>remove</button></div>
				<div><img src={'http://www.nasdaq.com/charts/' + this.props.stock + '_rm.jpeg'} /><br/>					
				<img src={'http://www.nasdaq.com/charts/' + this.props.stock + '_cnb.jpeg'} />

				</div>
			</div>
		);
	}

	//custom functions
	delete(){
		console.log('chartcomp delete')
		console.log(this.props.stock)
		this.props.onDeleteStock(this.props.stock);
	}
};

export default RecommendationChartComponent;