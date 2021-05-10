const { MODULE_TYPE } = process.env;

const babelEnvModulesConfig = MODULE_TYPE === "esm" ? { modules: false } : {};
const plugins = [];

if (MODULE_TYPE !== "esm") {
  plugins.push([
    "@babel/transform-modules-umd",
    {
      "globals": {
        "index": "utilHelpers"
      },
      "exactGlobals": true
    }
  ]);
}

if (MODULE_TYPE !== "global") {
  plugins.push("@babel/transform-runtime");
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
  plugins
}