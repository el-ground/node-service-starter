# node-service-starter
Node.js service starter with minimal components to be deployed

Using 
- node16 es module
- yarn 2
- ts-jest (no babel)


# What's different
1. Using tsc + es module. No babel dependency. This induces several problems, such as using compiled libraries that target commonjs. However, it provides much simpler dependencies, more readable compiled code, faster compilation, more standarized structure. Easier debugging, more future-proof.
2. Downsides
- aliasing with #
- node module resolve (inferring /index.js after directory import)
- extension (must provide .js)
## TODO
- esm module export type of builds
- on esm module export, peer dependencies
