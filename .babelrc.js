const { version } = require('./package.json');
const { MODULE_TYPE, NODE_ENV } = process.env;

const plugins = [
  ["minify-replace", {
    replacements: [
      {
        identifierName: "BUILD_VERSION",
        replacement: {
          type: "stringLiteral",
          value: version,
        },
      }
    ]
  }]
];

if (MODULE_TYPE === 'cjs' || MODULE_TYPE === 'esm') {
  plugins.push(["inline-json", { "matchPattern": "config" }]);
}

if (MODULE_TYPE === 'cjs') {
  plugins.push('@babel/transform-modules-commonjs');
}

if (MODULE_TYPE === 'esm' || NODE_ENV === 'test') {
  plugins.push('@babel/transform-runtime');
}

module.exports = {
  presets: [
    [
      '@babel/env',
      {
        modules: MODULE_TYPE === 'esm' ? false : 'auto',
        targets: ['> 1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9']
      }
    ]
  ],
  plugins
};
