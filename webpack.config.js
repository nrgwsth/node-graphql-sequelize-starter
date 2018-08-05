const path = require("path")

module.exports = [{
	mode: "development",
	target: "node",
	entry: "./server/index.ts",
	module: {
		rules: [{
			test: /.tsx?$/,
			use: "ts-loader",
			exclude: /node_modules/
		}]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, 'dist')
	},
	externals: ['pg', 'sqlite3', 'tedious', 'pg-hstore']
}, {
	mode: "development",
	target: "web",
	entry: "./client/index.tsx",
	module: {
		rules: [{
			test: /.tsx?$/,
			use: "ts-loader",
			exclude: /node_modules/
		}, {
			use: "babel-loader",
			test: /.jsx?$/,
			exclude: /node_modules/
		}]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, 'static/build'),
		publicPath: "/build/"
	},
	externals: ['pg', 'sqlite3', 'tedious', 'pg-hstore']
}]