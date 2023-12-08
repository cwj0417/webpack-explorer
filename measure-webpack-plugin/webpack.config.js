const MeasureWebpackPlugin = require('./measure-webpack-plugin')

module.exports = {
    entry: './index.js',
    mode: 'production',
    // parallelism: 1,
    // mode: 'development',
    // devtool: false,
    // optimization: {
    //     usedExports: false,
    //     minimize: false,
    //     sideEffects: false,
    //     innerGraph: false,
    //     providedExports: false,
    //     mangleExports: false,
    //     concatenateModules: false,
    // },
    module: {
        rules: [{
            test: /add/,
            loader: './loader-direct.js'
        }]
    },
    plugins: [new MeasureWebpackPlugin()]
}
