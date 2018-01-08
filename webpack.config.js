var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//var webpack = require('webpack');

var config = {
	entry: './app/app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/'
	},
	module: {
    rules: [
    		{ test: /\.(js)$/, use: 'babel-loader' },
    		{ test: /\.css$/, use: ['style-loader', 'css-loader' ]},
    		{ test: /\.scss$/,
    			use: [{
              loader: "style-loader" // creates style nodes from JS strings
            }, {
              loader: "css-loader" // translates CSS into CommonJS
            }, {
              loader: "sass-loader" // compiles Sass to CSS
            }]
        },
				{ test: /\.(png|jpg|gif)$/,
					use: [{
            loader: 'file-loader',
            options: {}
          }
        ]
      }
  	]
  },
	devServer: {
	 historyApiFallback: true
 },
  plugins: [
    new HtmlWebpackPlugin({
  	 template: 'app/static/index.html'
	 })]
};

module.exports = config;
