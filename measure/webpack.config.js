const NM = require('webpack/lib/NormalModule')
const pluginname = 'measure'
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
        mangleExports: false,
        concatenateModules: false,
    },
    module: {
        rules: [{
            test: /add/,
            loader: './loader-direct.js'
        }]
    },
    plugins: [{
        apply(compiler) {
            compiler.hooks.compilation.tap(pluginname, (compilation) => {

                // utils

                const formatId = (id) => id.replace(/.*\/(.*)/, '$1')

                // entry

                // const entryAdd = (entry, option) => {
                //     console.log('add entry', entry.request, option.name)
                // }

                // const entryDone = (entry, option) => {
                //     console.log('done entry', entry.request, option.name)
                // }
                // compilation.hooks.addEntry.tap(pluginname, entryAdd);
                // compilation.hooks.failedEntry.tap(pluginname, entryDone);
                // compilation.hooks.succeedEntry.tap(pluginname, entryDone);

                // module

                // module add and done

                // compilation.addModuleQueue.hooks.added.tap(pluginname, (m) => {
                //     console.log('add module', formatId(m.resource))
                // });
                // compilation.processDependenciesQueue.hooks.result.tap(pluginname, (m) => {
                //     console.log('module done', formatId(m.resource))
                // });

                // module build q in & out
                // compilation.buildQueue.hooks.added.tap(pluginname, (m) => {
                //     console.log('(in queue) build', formatId(m.resource))
                // });
                compilation.hooks.buildModule.tap(pluginname, (m) => {
                    console.log('build start', formatId(m.resource))
                });
                const moduleHooks = NM.getCompilationHooks(compilation)
                moduleHooks.beforeLoaders.tap(pluginname, (loaders, m) => {
                    console.log('<loader> init', formatId(m.resource), loaders.map(i => i.loader))
                })
                moduleHooks.beforeParse.tap(pluginname, (m) => {
                    console.log('<loader> done [before parse]', formatId(m.resource))
                })

                moduleHooks.beforeSnapshot.tap(pluginname, (m) => {
                    console.log('[parse and create hash] done, create snapshot', formatId(m.resource))
                })

                compilation.hooks.succeedModule.tap(pluginname, (m) => {
                    console.log('build suc', formatId(m.resource))
                })
                // compilation.buildQueue.hooks.result.tap(pluginname, (m) => {
                //     console.log('(out queue) build', formatId(m.resource))
                // });

                // compilation.buildQueue.hooks.result.tap(pluginname, (module) => {
                //     const id = formatId(module.resource);
                //     console.log('outttttttttttt', id);
                //   });

                //   compilation.processDependenciesQueue.hooks.added.tap(pluginname, (module) => {
                //     const id = formatId(module.resource);
                //     console.log('--------start process dep', id);
                //   });


                // compilation.factorizeQueue.hooks.added.tap(pluginname, (param) => {
                //     console.log(param?.originModule?.resource ?? 'xxxxxx', 'in')
                //     console.log(Object.keys(param));
                //     console.log(param.dependencies.map(i => i.request));
                //     const id = formatId(param.originModule.resource);
                //     console.log('--------start factorizeQueue-----', id);
                // });

                // compilation.factorizeQueue.hooks.result.tap(pluginname, (param) => {
                //     console.log(param?.originModule?.resource ?? 'zzzzzzz', 'out')
                //     const id = formatId(param.originModule.resource);
                //     console.log('-------------------out factorizeQueue-----', id);
                // });
            })
        }
    }]
}
