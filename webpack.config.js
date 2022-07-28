const is_production = process.env.NODE_ENV !== "development";

const webpack = require("webpack");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: is_production ? "production" : "development",
  entry: "./src/main.ts",
  optimization: is_production ? {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        ecma: 6,
        keep_fnames: true,
        keep_classnames: true
      }
    })],
  } : {},
  output: {
    filename: "index.js",
    path: path.join(__dirname, "./dist"),
    libraryExport: "default",
    library: "Live2dHelper",
    libraryTarget: "umd"
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader"
      }
    ]
  },
  devtool: is_production ? undefined : "inline-source-map",
  resolve: {
    extensions: [".ts"],
    alias: {
      Live2DCubismCore: path.resolve(__dirname, "./src/Core/live2dcubismcore.min.js")
    },
    fallback: {
      fs: false,
      path: require.resolve("path-browserify")
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      Live2DCubismCore: path.resolve(__dirname, "./src/Core/live2dcubismcore.min.js")
    })
  ],
  performance: {
    hints: false
  },
  watch: !is_production
};
