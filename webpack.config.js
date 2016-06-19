var path = require('path');
var webpack = require('webpack');
var ngAnnotate = require('ng-annotate-webpack-plugin');

module.exports = {
    entry: './app/app.js',
    output: {
        path: path.resolve('app'),
        filename: 'app.bundle.js'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
        ,new ngAnnotate({
            add: true,
            // other ng-annotate options here
        })
        , new webpack.optimize.UglifyJsPlugin()
    ]
}