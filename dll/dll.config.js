const webpack = require('webpack')
exports.default = {
    entry: {
        justplain: './src/justplain.js',
        entry: './src/index.js'
    },
    mode: 'development',
    output: {
        path: __dirname + '/dll',
        filename: 'dll.[name].js',
        library: '[name]_[fullhash]',
    },
    devtool: false,
    plugins: [new webpack.DllPlugin({
        context: __dirname,
        name: '[name]_[fullhash]',
        path: __dirname + '/dll/manifest.json',
        format: true,
    })]
}