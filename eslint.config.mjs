import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: ['dist/', 'dist-bak/', 'types/', 'docs/', 'coverage/', 'lib/', 'esm/', 'es/']
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin
    },
    languageOptions: {
      parser: tseslint.parser,
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/ban-ts-comment': 0

      // '@typescript-eslint/no-unnecessary-type-constraint': 0,
      // '@typescript-eslint/no-non-null-assertion': 0,
      // '@typescript-eslint/no-empty-function': 0,
      // '@typescript-eslint/no-array-constructor': 0
    }
  }
);
