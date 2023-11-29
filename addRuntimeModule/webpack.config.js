const RuntimeModule = require('webpack/lib/RuntimeModule')
const { publicPath } = require('webpack/lib/RuntimeGlobals')

class XModule extends RuntimeModule {
    constructor() {
		super("xxx", RuntimeModule.STAGE_BASIC);
	}
    generate() {
        return 'console.log("x")'
    }
}

class ModifyPPModule extends RuntimeModule {
    constructor() {
		super("modify publich patch", RuntimeModule.STAGE_BASIC);
	}
    generate() {
        return `${publicPath} = 'localhost'`
    }
}

exports.default = {
    entry: './index.js',
    // mode: 'production',
    mode: 'development',
    devtool: false,
    plugins: [{
        apply(compiler) {
            compiler.hooks.compilation.tap('x', (compilation) => {
                compilation.hooks.additionalTreeRuntimeRequirements.tap('x', (chunk) => {
                    compilation.addRuntimeModule(
                        chunk,
                        new XModule()
                    );
                    compilation.addRuntimeModule(
                        chunk,
                        new ModifyPPModule()
                    );
                })
            })
        }
    }]
}
