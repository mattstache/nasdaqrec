var path = require('path');
//var ExtractTextPlugin = require("extract-text-webpack-plugin");
const config = require('./src/app/model/config');

module.exports = {
	node: {
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		module: 'empty'
	},
    entry: path.resolve(__dirname, 'src') + '/app/index.jsx',
    output: {
        path: path.resolve(__dirname, 'dist') + '/app',
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-2']
                }
            },
            {
		        test: /\.scss$/,
		        loaders: ["style-loader", "css-loader", "postcss-loader","sass-loader"]
		    },
		    {
		    	test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
		    	use: [{
		    		loader: 'file-loader',
		    		options: {
		    				name: '[name].[ext]',
							outputPath: 'fonts/',    // where the fonts will go
							publicPath: '../'       // override the default path
						}
					}]
			},
        ]
    },
};