const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './src/index.tsx'
    },
    output: {
        path: path.join(__dirname, '../dist/'),
        filename: '[name].bundle.js'
    },
    watch: true,
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    devServer: {
        contentBase: path.join(__dirname, '../dist/'),
        port: 3001
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            { test: /.tsx?$/, loader: ['awesome-typescript-loader'] },
            { test: /.html$/, loader: 'raw-loader' },
            { test: /\.json$/, loader: 'json-loader' },
            { test:/\.(s*)css$/, loader:['style-loader','css-loader', 'sass-loader'] },
            { test: /\.woff(\?.+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
            { test: /\.woff2(\?.+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
            { test: /\.ttf(\?.+)?$/, loader: 'file-loader' },
            { test: /\.eot(\?.+)?$/, loader: 'file-loader' },
            { test: /\.svg(\?.+)?$/, loader: 'file-loader' },
            { test: /\.png$/, loader: 'url-loader?mimetype=image/png' },
            { test: /\.gif$/, loader: 'url-loader?mimetype=image/gif' }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            showErrors: true,
            title: 'React-TS-Webpack App',
            path: path.join(__dirname, '../dist/'),
            hash: true
        })
    ]
};
