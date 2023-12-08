const NM = require('webpack/lib/NormalModule');
const { RawSource } = require('webpack').sources;

const htmltpl = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>measureRes</title>
    <style>td { border: 1px solid black }</style>
</head>
<body>
    <h3>展示耗时排名, 全局变量 measureResult, formated 进行自定义分析</h3>
</body>
<script>
const measureResult = {measureResult}
const formated = {formated}
const render = (columns, data) => {
  const table = document.createElement('table')
  const title = document.createElement('tr')
  for (let column of columns) {
    const td = document.createElement('td')
    td.innerHTML = column.name
    title.appendChild(td)
  }
  const content = document.createDocumentFragment()
  for (let item of data) {
    const tr = document.createElement('tr')
    for (let column of columns) {
      const td = document.createElement('td')
      td.innerHTML = column.render(item)
      tr.appendChild(td)
    }
    content.appendChild(tr)
  }
  table.appendChild(title)
  table.appendChild(content)
  document.body.appendChild(table)
}
render([{
  name: 'id',
  render: r => r.id
}, {
  name: 'build总耗时',
  render: r => r.build
}, {
  name: '执行loader',
  render: r => r.load
}, {
  name: 'parse结果+创建hash',
  render: r => r.parse
}, {
  name: '创建snapshot',
  render: r => r.snapshot
}, {
  name: 'loader详情',
  render: r => r.loaders.map(i => i.loader.replace(/.*node_modules/, '')).join(',')
}], formated)
</script>
</html>
`;
class MeasureWebpackPlugin {
  constructor(opts = {}) {
    const { formatId = id => id.replace(/.*\/(.*)/, '$1') } = opts;
    this.formatId = formatId;
  }

  apply(compiler) {
    const pluginname = 'measure-webpack-plugin';
    compiler.options.parallelism = 1;
    compiler.hooks.thisCompilation.tap(pluginname, (compilation) => {
      const moduleHooks = NM.getCompilationHooks(compilation);

      const measureResult = {};

      // build phase measurement

      compilation.hooks.buildModule.tap(pluginname, (module) => {
        if (module.resource) {
          const id = this.formatId(module.resource);
          measureResult[id] = {};
        }
      });

      moduleHooks.beforeLoaders.tap(pluginname, (loaders, module) => {
        if (module.resource) {
          const id = this.formatId(module.resource);
          measureResult[id].loaders = loaders;
          measureResult[id].load = Date.now();
        }
      });
      moduleHooks.beforeParse.tap(pluginname, (module) => {
        if (module.resource) {
          const id = this.formatId(module.resource);
          measureResult[id].parse = Date.now();
        }
      });

      moduleHooks.beforeSnapshot.tap(pluginname, (module) => {
        if (module.resource) {
          const id = this.formatId(module.resource);
          measureResult[id].snapshot = Date.now();
        }
      });

      compilation.hooks.succeedModule.tap(pluginname, (module) => {
        if (module.resource) {
          const id = this.formatId(module.resource);
          measureResult[id].done = Date.now();
        }
      });

      // structure and emit

      compilation.hooks.processAssets.tap('emitMesure', () => {
        const formated = Object.entries(measureResult).map(i => ({
          id: i[0], loaders: i[1].loaders, build: i[1].done - i[1].load, load: i[1].parse - i[1].load, parse: i[1].snapshot - i[1].parse, snapshot: i[1].done - i[1].snapshot,
        })).sort((a, b) => b.build - a.build);
        compilation.emitAsset('measureResult.html', new RawSource(htmltpl.replace('{measureResult}', JSON.stringify(measureResult)).replace('{formated}', JSON.stringify(formated))));
      });
    });
  }
}

module.exports = MeasureWebpackPlugin;
