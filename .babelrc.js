const { MODULE_TYPE } = process.env;

const babelEnvModulesConfig = MODULE_TYPE === 'esm' ? { modules: false } : {};
const plugins = MODULE_TYPE === 'esm' ? {} : {
  "plugins": [
    [
      "@babel/transform-modules-umd",
      {
        "globals": {
          "index": "utilHelpers"
        },
        "exactGlobals": true
      }
    ]
  ]
}

module.exports = {
  "presets": [
    [
      "@babel/env",
      {
        ...babelEnvModulesConfig,
        "targets": [
          "> 1%",
          "last 4 versions",
          "Firefox ESR",
          "not ie < 9"
        ]
      }
    ]
  ],
  ...plugins
}