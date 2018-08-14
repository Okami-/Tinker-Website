const path = require("path");
const webpack = require("webpack");

module.exports = {
	devtool: "source-map",
	entry: "./src/index.jsx",
	mode: "development",
	module: {
		rules: [
		{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			options: { presets: ['env'] }
		},
		{
			test: /\.scss$/,
			include: path.appSrc,
			loaders: ["style", "css", "sass"]
		},
		]
	},
	resolve: { extensions: ['*', '.js', '.jsx'] },
	output : {
		path: path.resolve(__dirname, "dist/"),
		publicPath: "/dist",
		filename: "bundle.js"
	},
	devServer: {
		contentBase: path.join(__dirname, "public/"),
		port: 3000,
		publicPath: "http://localhost:3000/dist/",
		hotOnly: true
	},
	plugins: [ new webpack.HotModuleReplacementPlugin() ]
};