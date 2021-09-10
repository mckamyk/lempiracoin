import HtmlWebpackPlugin from 'html-webpack-plugin';
import * as webpack from 'webpack';
import {Configuration} from 'webpack-dev-server';

interface Config extends webpack.Configuration {
  devServer?: Configuration;
}

const config: Config = {
	mode: 'production',
	entry: './src/gui/root.ts',

	plugins: [
		new HtmlWebpackPlugin({template: './src/gui/index.ejs'}),
	],

	devtool: 'inline-source-map',
	devServer: {
		compress: true,
		port: 9000,
		https: true,
	},

	resolve: {
		extensions: ['.ts', '.js', '.json'],
	},

	watchOptions: {
		ignored: [
			'gui/types',
		],
	},

	module: {
		rules: [
			{test: /\.ts$/, loader: 'ts-loader'},
			{test: /\.svg$/, type: 'asset/source'},
		],
	},
};

export default config;
