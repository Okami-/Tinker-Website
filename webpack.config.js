const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

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
			{ 
				test: /(\.css$)/, 
				loaders: [
					'style-loader', 
					'css-loader'
				] 
			},
			{
				test: /\.scss$/,
				include: path.appSrc,
				use: [
					{
						loader: "style-loader"
					},
					{
						loader: "css-loader",
						options: {
							sourceMap: true
						}
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true
						}
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
			}
		]
	},
	resolve: { extensions: ['*', '.js', '.jsx'] },
	output : {
		path: path.resolve(__dirname, "dist"),
		publicPath: "/",
		filename: "bundle.js"
	},
	devServer: {
		contentBase: path.join(__dirname, "public"),
		port: 8080,
		publicPath: "/",
		hot: true,
		open: true,
		historyApiFallback: true,
		proxy: [ // allows redirect of requests to webpack-dev-server to another destination
			{
			  context: ['/api', '/auth/', '/logout', '/profile'],  // can have multiple
			  target: 'http://[::1]:8085', //server and port to redirect to
			  changeOrigin: false,
			  secure: false //don't use https
			}
		],
	},
	
	plugins: [ 
		new webpack.ProvidePlugin({
    		'window.Quill': 'quill'
 		 }),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			title:"Tinker",
			template:__dirname+'/public/index.html',
			inject: 'body',
			filename: 'index.html'
		}),
		new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
      		chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
		}),
		new ManifestPlugin({
			fileName: 'asset-manifest.json'
		}),
		new SWPrecacheWebpackPlugin({
			dontCacheBustUrlsMatching: /\.\w{8}\./,
			filename: 'service-worker.js',
			logger(message) {
				if (message.indexOf('Total precache size is') === 0) {
					return;
				}
				console.log(message);
			},
			minify: true,
			navigateFallback: '/index.html',
			staticFileGlobsIgnorePatters: [/\.map$/, /asset-manifest\.json$/],
		})
	]
};