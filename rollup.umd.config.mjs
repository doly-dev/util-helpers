import { defineConfig } from 'rollup';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { umdDir, pkgName, globalName, input, plugins } from './rollup.base.config.mjs';

export default defineConfig({
  input,
  output: [
    {
      format: 'umd',
      file: `${umdDir}/${pkgName}.js`,
      name: globalName,
      sourcemap: true
    },
    {
      format: 'umd',
      file: `${umdDir}/${pkgName}.min.js`,
      name: globalName,
      sourcemap: true,
      plugins: [terser()]
    }
  ],
  plugins: [
    ...plugins,
    typescript({
      compilerOptions: {
        removeComments: true
      }
    })
  ]
});
