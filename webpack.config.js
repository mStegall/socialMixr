var path = require('path');
var webpack = require('webpack');
var ngAnnotate = require('ng-annotate-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
    entry: './app/app.js',
    output: {
        path: path.resolve('app', 'dist'),
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.s?css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'sass-loader')
            }, {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'url?limit=10000&mimetype=application/font-woff'
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'file'
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            }, { 
                test: /\.jpg$/,    
                loader: "url-loader?limit=10000&mimetype=image/jpg"
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
        new ExtractTextPlugin('style.css',{
            allChunks: true
        })        
    ]
};

if (process.env.NODE_ENV != "developement") {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;