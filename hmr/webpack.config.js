module.exports = {
    entry: './index.js',
    mode: 'development',
    devtool: false,
    optimization: {
        usedExports: false,
        minimize: false,
        sideEffects: false,
        innerGraph: false,
        providedExports: false,
        mangleExports: false, // module的exports 保留变量名字, 还是被压缩
        concatenateModules: false,
    },
    devServer: {
        hot: true,
        devMiddleware: {
            writeToDisk: false
        },
        static: ['dist', 'public'],
    }
}