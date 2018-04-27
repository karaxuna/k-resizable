var merge = require('webpack-merge');
var baseConfig = require('./webpack.config.base.js');

module.exports = merge(baseConfig, {
    entry: {
        'k-resizable': './src/lib/index.ts'
    },
    output: {
        library: 'k-resizable',
        libraryTarget: 'umd'
    }
});
