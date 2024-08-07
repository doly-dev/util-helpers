import { defineConfig } from 'rollup';
import { esmDir, cjsDir, input, plugins } from './rollup.base.config.mjs';

export default defineConfig({
  input,
  external: ['tslib', 'ut2', 'emitter-pro', 'cache2'],
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
    }
  ],
  plugins
});
