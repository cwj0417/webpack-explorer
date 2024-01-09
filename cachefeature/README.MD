## webpack cache

这里的例子看起来cache chunk 性能提升明显
cache module 性能和没cache一样

但在真实项目中, module是可以cache的, 有待验证.

另外2个问题:
+ dev和prod为什么不共享, 能不能共享
+ 体积无限增大怎么办, 有没有配置, 原理是什么