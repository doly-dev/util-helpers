import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json' assert { type: "json" };
import { camelCase } from 'ut2';

export const pkgName = pkg.name;
export const globalName = camelCase(pkg.name);
export const umdDir = 'dist';
export const esmDir = 'esm';
export const cjsDir = 'lib';
export const typesDir = 'types';
export const input = './src/index.ts';
export const plugins = [
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
