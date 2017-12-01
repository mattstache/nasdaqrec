var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StockSchema = new Schema({
	symbol: {type: String, required: true, unique: true},
	latestPrice: {type: String}
})

module.exports = mongoose.model('Stock', StockSchema);