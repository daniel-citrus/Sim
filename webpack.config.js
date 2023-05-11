const path = require('path');

module.exports = {
    entry: './src/scripts/main.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist/scripts'),
    },
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
        ],
    },
};