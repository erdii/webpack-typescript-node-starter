const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const PATHS = {
	src: path.join(__dirname, "src"),

	build: path.join(__dirname, "build"),
};

const nodeModules = {};

fs.readdirSync("node_modules")
	.filter(x => [".bin"].indexOf(x) === -1)
	.forEach(mod => {
		nodeModules[mod] = `commonjs ${mod}`;
	});


module.exports = {
	entry: {
		app: path.join(PATHS.src, "index.ts"),
	},

	context: PATHS.src,

	target: "node",

	externals: nodeModules,

	output: {
		path: PATHS.build,
		filename: "[name].js",
	},

	resolve: {
		extensions: [".ts", ".js", ".json", "*"],

		alias: {
			"~": PATHS.src,
		},
	},

	devtool: "sourcemap",

	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /(node_modules|bower_components)/,
				include: [PATHS.src],
				use: [
					{
						loader: "ts-loader",
						options: {
							silent: true,
							visualStudioErrorFormat: true,
							logLevel: "warn"
						}
					}
				]
			},
		],
	},

	plugins: [
		new webpack.IgnorePlugin(/\.(css|less)$/),
		new webpack.BannerPlugin({
			banner: "require('source-map-support').install();",
			raw: true,
			entryOnly: false,
		}),
		new CopyWebpackPlugin([
			{ from: "misc/*" },
			{ from: "../package.json" },
			{ from: "../README.DEPLOYED.md", to: "README.md" },
		]),
	],
};
