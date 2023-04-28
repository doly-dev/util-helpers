const { version } = require('./package.json');

const plugins = [
  [
    'minify-replace',
    {
      replacements: [
        {
          identifierName: 'BUILD_VERSION',
          replacement: {
            type: 'stringLiteral',
            value: version
          }
        }
      ]
    }
  ]
];

const presets = [
  [
    '@babel/env',
    {
      targets: { node: 'current' }
    }
  ],
  '@babel/preset-typescript'
];

module.exports = {
  presets,
  plugins
};
