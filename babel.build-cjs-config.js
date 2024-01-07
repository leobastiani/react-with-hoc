/* eslint-disable @typescript-eslint/no-var-requires */
const { ignore } = require("./babel.build-esm-config");

module.exports = {
  ignore,
  assumptions: {
    enumerableModuleMeta: false,
    noIncompleteNsImportDetection: true,
  },
  presets: ["@babel/preset-typescript"],
  plugins: [
    [
      "@babel/plugin-transform-modules-commonjs",
      {
        importInterop: "none",
        loose: true,
        strict: true,
      },
    ],
    [
      "@babel/plugin-transform-react-jsx",
      {
        runtime: "classic",
        useSpread: true,
      },
    ],
  ],
};
