const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:{
      main:'./src/js/controller/index.js',
      home: './src/js/controller/home.js',
      signup: './src/js/controller/signup.js',
      profile: './src/js/controller/profile.js'

    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name]/index.js'
    },
    devServer: {
        contentBase: './dist',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/html/index.html',
            chunks:['main']
        }),
        new HtmlWebpackPlugin({
            filename: 'home/index.html',
            template: './src/html/home.html',
            chunks:['home']
        }),
        new HtmlWebpackPlugin({
            filename: 'signup/index.html',
            template: './src/html/signup.html',
            chunks:['signup']
        }),
        new HtmlWebpackPlugin({
            filename: 'home/profile/index.html',
            template: './src/html/profile.html',
            chunks:['profile']
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};
