var path = require('path');
//var ExtractTextPlugin = require("extract-text-webpack-plugin");
const merge = require('webpack-merge');
const config = require('./src/app/model/config');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devServer: {
		proxy: {
      		'/api': {
        		target: config.apiUrl,
        		secure: false,
        	}
		}
	}
});