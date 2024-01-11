## dll

## 运行

+ npx webpack --config dll.config.js
+ npx webpack --config main.config.js

## 结论

dll即使在真实项目中, 对build速度提升很小, 因为一般情况在node_modules里的东西本来就不走loader, 耗时不多.

另外, 在有2个入口的时候, 看起来manifest文件是有bug的, 只要多跑几次就会输出错误的json. 这个以后再看.
