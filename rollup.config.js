import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

// 字符串中的链接符转为驼峰
function toCamel(str) {
  return str.replace(/-(.{1})/g, (m, p1) => {
    return /[a-z]/.test(p1) ? p1.toUpperCase() : p1;
  });
}

const globalVarName = toCamel(pkg.name);

export default {
  input: "./src/index.js",
  output: [
    {
      format: "umd",
      file: `dist/${pkg.name}.js`,
      name: globalVarName,
      sourcemap: "inline"
    },
    {
      format: "umd",
      file: `dist/${pkg.name}.min.js`,
      name: globalVarName,
      sourcemap: true,
      plugins: [terser()]
    }
  ],
  plugins: [
    resolve(),
    commonjs()
  ]
}