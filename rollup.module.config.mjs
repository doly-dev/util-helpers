import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import { esmDir, cjsDir, input, plugins } from './rollup.base.config.mjs';

export default defineConfig({
  input,
  external: ['tslib'],
  treeshake: {
    preset: 'safest'
  },
  output: [
    {
      format: 'es',
      dir: esmDir,
      preserveModules: true,
      preserveModulesRoot: 'src'
    },
    {
      format: 'cjs',
      dir: cjsDir,
      preserveModules: true,
      preserveModulesRoot: 'src'
    },
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
