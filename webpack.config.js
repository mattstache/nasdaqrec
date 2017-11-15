var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const config = require('./src/app/model/config');
// var nodeExternals = require('webpack-node-externals');

module.exports = {
	// target: 'node', // in order to ignore built-in modules like path, fs, etc. 
 //    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
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
		    }
        ]
    },
    devServer: {
		proxy: {
      		'/api': {
        		target: config.apiUrl,
        		//changeOrigin: true,
        		secure: false,
        		//headers: {'http-x-requested-with' : 'XMLHttpRequest' }
        	}
  
    //"**": {target: "http://localhost:3001"}
  
        }
	}
};