exports.default = {
    entry: './index.js',
    // mode: 'production',
    mode: 'development',
    devtool: false,
    optimization: {
        usedExports: true,
        // minimize: true,
        // sideEffects: true,
        // innerGraph: true,
        // providedExports: true,
        // mangleExports: true, // module的exports 保留变量名字, 还是被压缩
        // moduleIds: 'deterministic', // named moduleid 是不是数字, 还是文件名字
        // concatenateModules: true,
        // concatenateModules: false,
    },
}