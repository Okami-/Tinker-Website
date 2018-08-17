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
				options: { 
					presets: ['env', 'react', 'stage-0']
				}
			},
			{
				test: /\.scss$/,
				include: path.appSrc,
				use: [
					{
						loader: "style-loader"
					},
					{
						loader: "css-loader"
					},
					{
						loader: "sass-loader"
					}
				]
			},
		]
	},
	resolve: { extensions: ['*', '.js', '.jsx'] },
	output : {
		path: path.resolve(__dirname, "public/"),
		publicPath: "src/assets/",
		filename: "bundle.js"
	},
	devServer: {
		contentBase: path.join(__dirname, "public/"),
		port: 8080,
		proxy: {
			"*": {
				target: "http://[::1]:3000",
				changeOrigin: true,
				secure: false
			}
		},
		publicPath: "http://localhost:8080/public/",
		hot: true
	},
	plugins: [ 
		new webpack.HotModuleReplacementPlugin() 
	]
};