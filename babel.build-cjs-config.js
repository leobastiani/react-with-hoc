module.exports = {
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
  ],
};
