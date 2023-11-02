
[javy](https://github.com/bytecodealliance/javy) 测试。

javy 是一个将 js 转为 wasm 的工具。但我看下来，发现是把目标 js 代码和 quickjs 一起打包了而已，性能拉跨。

```sh
./javy compile src/fib.js -o dist/fib.wasm
pnpm dev
```


