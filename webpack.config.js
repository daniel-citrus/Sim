const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/scripts/main.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist/scripts'),
        clean: true,
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'Sim',
        filename: '../index.html',
        template: './src/index_template.html'
    }),
    new MiniCssExtractPlugin(),
    ],
    resolve: {
        alias: {
            Script: path.resolve(__dirname, 'src/scripts'),
        }
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            },
        ],
    },
};