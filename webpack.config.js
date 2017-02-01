const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

const PAGES_PATH = './src/pages';

function generateHtmlPlugins(items) {
	return items.map(name => new HtmlPlugin({
		filename: `./${name}.html`,
		chunks: [name]
	}));
}

module.exports = {
	entry: {
		'background': `${PAGES_PATH}/background`,
		'popup': `${PAGES_PATH}/popup`,
		'content-script': `${PAGES_PATH}/content-script`
	},
	output: {
		path: path.resolve('dist/pages'),
		filename: '[name].js'
	},
	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] },
			{ test: /\.css$/, exclude: /node_modules/, use: [ 'style-loader', 'css-loader' ] }
		]
	},
	// This allows you to import modules just like you would in a NodeJS app.
	resolve: {
		extensions: ['.js', '.jsx'],
		modules: [ path.resolve(__dirname, 'node_modules') ]
	},
	// Since some NodeJS modules expect to be running in Node, it is helpful to set this environment var to avoid reference errors.
	plugins: [
		new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
		new CopyPlugin([{ from: 'src', to: path.resolve('dist'), ignore: ['pages/**/*'] }]),
		...generateHtmlPlugins([ 'background', 'popup' ])
	],
	watch : true,
	//This will expose source map files so that errors will point to your original source files instead of the transpiled files.
	devtool: 'sourcemap'
};
