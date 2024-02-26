## 子模块共用cache尝试

分别到pkg1, pkg2里`npx webpack`, 不需要特别的操作, 是可以共享cache的. 如果发现cache变大, 可能是并发操作导致的, 因为写入的时候是异步的.