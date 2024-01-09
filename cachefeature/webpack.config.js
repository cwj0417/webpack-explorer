exports.default = {
    entry: './index.js',
    mode: 'development',
    devtool: false,
    cache: {
        type: 'filesystem',
        cacheDirectory: __dirname + '/cache',
    }
}