const webpack = require('webpack')
exports.default = {
    entry: './src/index.js',
    mode: 'development',
    devtool: false,
    plugins: [new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require(__dirname + '/dll/manifest.json')
    }),]
}