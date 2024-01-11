## dll

## 运行

+ npx webpack --config dll.config.js
+ npx webpack --config main.config.js

## 结论

dll即使在真实项目中, 对build速度提升很小, 因为一般情况在node_modules里的东西本来就不走loader, 耗时不多.

## 一个小问题

在有2个入口的时候, 看起来manifest文件是有bug的, 只要多跑几次就会输出错误的json.

有2个方法解决这个问题.
+ Dll插件的option的path 加上 [name] 模板, 这样会输出多个manifest, 就不会有问题了.
+ 使用clean-webpack-plugin. 具体原理还说不清. `rm -rf dist && npx webpack`也是不行的.
