var path = require('path');
var webpack = require('webpack');
var ngAnnotate = require('ng-annotate-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
    entry: './app/app',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    output: {
        path: path.resolve('app', 'dist'),
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.s?css$/,
                loader: ExtractTextPlugin.extract('style', 'css!sass?includePaths[]=./node_modules')
            }, {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            }, {
                test: /\.jpg$/,
                loader: "url-loader?limit=10000&mimetype=image/jpg"
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader'
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            }, { 
                test: /\.tsx?$/, 
                loader: 'ts-loader' 
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new ngAnnotate({
            add: true
            // other ng-annotate options here
        }),
        new ExtractTextPlugin('style.css', {
            allChunks: true
        })
    ]
};

if (process.env.NODE_ENV == "production") {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;