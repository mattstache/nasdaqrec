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

		let newsElement = this.props.stock.news.map(function(article, index){
			var savedDateTime = new Date(article.datetime);
			var today = new Date();
			var millisecondsDiff = today - savedDateTime;
			var minutesOld = parseInt(millisecondsDiff / 1000 / 60);
			var hoursOld = Math.round(minutesOld / 60);
			var daysOld = Math.round(hoursOld / 24);
			var age = "";

			if(minutesOld < 60){
				age = minutesOld + ' minute' + (minutesOld > 1 ? "s" : "");
			}else if(hoursOld < 24){
				age = hoursOld + ' hour' + (hoursOld > 1 ? "s" : "");
			}else{
				age = daysOld + ' day' + (daysOld > 1 ? "s" : "");
			}
			//var age = hoursOld > 24 ? daysOld + ' day' + (daysOld > 1 ? "s" : "") : hoursOld + ' hour' + (hoursOld > 1 ? "s" : "");

			return(
				<div key={index} className="card__news__article">
					<div>
						<a className="card__news__headline" target="_blank" href={article.url}>{article.headline}</a>
						<div className="card__news__date">{age} ago</div>
					</div>
				</div>
			)
		}.bind(this));

		var date = new Date();
		var milliseconds = date.getTime();

		return(
			<div key={this.props.stock._id} className="card">
				<div><a target='_blank' className="card__symbol" href={'http://www.nasdaq.com/symbol/' + this.props.stock.symbol + '/recommendations'}>{this.props.stock.symbol} <i className="fa fa-external-link card__symbol__icon" /></a> <button className="card__remove-button" onClick={this.delete}><i className="fa fa-times" /></button></div>
				<div className="card__current-price">${this.props.stock.latestPrice}</div>
				<div>
					<img className="card__imported-img" src={'http://www.nasdaq.com/charts/' + this.props.stock.symbol + '_rm.jpeg?time=' + milliseconds} /><br/>					
					<img className="card__imported-img" src={'http://www.nasdaq.com/charts/' + this.props.stock.symbol + '_cnb.jpeg?time=' + milliseconds} />
				</div>
				<div className="card__news">
					<div className="card__section-headline">News</div>
					<div>
						{newsElement}
					</div>
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