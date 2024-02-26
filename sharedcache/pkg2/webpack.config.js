exports.default = {
    entry: './index.js',
    mode: 'development',
    devtool: false,
    cache: {
        type: 'filesystem',
        cacheDirectory: __dirname + '/../pkg1/cache',
        // maxAge: 1,
    }
}