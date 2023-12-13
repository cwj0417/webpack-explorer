## measure-webpack-plugin

analyze your webpack compile process.

## useage

if you use webpack.config.js.

```js
const MeasureWebpackPlugin = require('measure-webpack-plugin')
module.exports = {
    ...{
        yourConfs: ''
    },
    plugins: [new MeasureWebpackPlugin()]
}
```

or you use webpack-chain scripting your webpack config.

```js
config.plugin('measure').use(require('measure-webpack-plugin'));
```

## check analyze result

visit `yourHost/measureResult.html` on dev,
or visit `yourDistDir/measureResult.html`.
