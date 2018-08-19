const path = require("path");
const webpack = require("webpack");
module.exports = {
	devtool: "source-map",
	entry: "./src/index.jsx",
	mode: "development",
	node: {
		fs: 'empty'
	},  
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
			{ test: /(\.css$)/, loaders: ['style-loader', 'css-loader'] },
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
			{
				test: /\.(png|jp(e*)g|svg)$/,  
				use: [{
					loader: 'url-loader',
					options: { 
						limit: 8000, // Convert images < 8kb to base64 strings
						name: 'images/[hash]-[name].[ext]'
					} 
				}]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: {
					loader: "file-loader",
					options: {
						name: "fonts/[name].[ext]",
					},
				},
			},
		]
	},
	resolve: { extensions: ['*', '.js', '.jsx'] },
	output : {
		path: path.resolve(__dirname, "dist"),
		publicPath: "/dist/",
		filename: "bundle.js"
	},
	devServer: {
		contentBase: path.join(__dirname, "dist/"),
		port: 3000,
		// proxy: {
		// 	// "*": {
		// 	// 	target: "http://[::1]:8080",
		// 	// 	changeOrigin: true,
		// 	// 	secure: false
		// 	// }
		// },
		publicPath: "http://localhost:3000/dist/",
		hot: true
	},
	plugins: [ 
		new webpack.HotModuleReplacementPlugin()
	]
};