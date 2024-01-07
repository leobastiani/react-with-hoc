/** @type {import('@babel/core').TransformOptions} */
module.exports = {
  ignore: ["src/example", "src/test", "**/*.test.tsx"],
  presets: ["@babel/preset-typescript"],
  plugins: [
    [
      "@babel/plugin-transform-react-jsx",
      {
        runtime: "classic",
        useSpread: true,
      },
    ],
  ],
};
