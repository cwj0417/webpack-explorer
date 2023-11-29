const RuntimeModule = require('webpack/lib/RuntimeModule')

class XModule extends RuntimeModule {
    constructor() {
		super("xxx", RuntimeModule.STAGE_BASIC);
	}
    generate() {
        return 'console.log("x")'
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
                })
            })
        }
    }]
}
