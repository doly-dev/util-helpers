import { camelCase } from 'ut2';
import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import pkg from './package.json' assert { type: 'json' };

const globalName = camelCase(pkg.name);
const outputDirConfig = {
  umd: 'dist',
  esm: 'esm',
  cjs: 'lib'
};
const input = './src/index.ts';
const plugins = [
  replace({
    preventAssignment: true,
    values: {
      BUILD_VERSION: JSON.stringify(pkg.version)
    }
  }),
  resolve(),
  commonjs(),
  typescript({
    tsconfig: './tsconfig.build.json',
    compilerOptions: {
      removeComments: true
    }
  })
];

export default defineConfig([
  {
    input,
    external: ['tslib', 'ut2', 'cache2'],
    output: [
      {
        format: 'es',
        dir: outputDirConfig.esm,
        preserveModules: true,
        preserveModulesRoot: 'src'
      },
      {
        format: 'cjs',
        dir: outputDirConfig.cjs,
        preserveModules: true,
        preserveModulesRoot: 'src'
      }
    ],
    plugins
  },
  {
    input,
    output: [
      {
        format: 'umd',
        file: `${outputDirConfig.umd}/${pkg.name}.js`,
        name: globalName,
        sourcemap: true
      },
      {
        format: 'umd',
        file: `${outputDirConfig.umd}/${pkg.name}.min.js`,
        name: globalName,
        sourcemap: true,
        plugins: [terser()]
      }
    ],
    plugins
  }
]);
