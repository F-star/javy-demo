import { WASI, File, OpenFile, PreopenDirectory } from "@bjorn3/browser_wasi_shim";



let args = ["bin", "arg1", "arg2"];
let env = ["FOO=bar"];
let fds = [
    new OpenFile(new File([])), // stdin
    new OpenFile(new File([])), // stdout
    new OpenFile(new File([])), // stderr
    new PreopenDirectory(".", {
        "example.c": new File(new TextEncoder("utf-8").encode(`#include "a"`)),
        "hello.rs": new File(new TextEncoder("utf-8").encode(`fn main() { println!("Hello World!"); }`)),
    }),
];
let wasi = new WASI(args, env, fds);

let wasm = await WebAssembly.compileStreaming(fetch("./dist/fib.wasm"));
let inst = await WebAssembly.instantiate(wasm, {
    "wasi_snapshot_preview1": wasi.wasiImport,
});



const fib = (n) => {
  if (n <= 1) {
    return 1
  }
  return fib(n - 1) + fib(n - 2)
}
console.log('js fib(40)')
let now = performance.now()
fib(40)
console.log(performance.now() - now)

console.log('javy wasm fib(40)')
now = performance.now()
wasi.start(inst);
console.log(performance.now() - now)