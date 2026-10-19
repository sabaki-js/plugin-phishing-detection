// Root re-export shim — short relative import:
//
//   import plugin from "./sabaki-phishing-detection/index.js";
//
// (Node ESM does not resolve bare directory paths, even with
// package.json "main"/"exports", so this file bridges the gap.)
export { default } from "./dist/index.js";
export * from "./dist/index.js";
