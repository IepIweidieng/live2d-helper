const is_production = process.env.NODE_ENV !== "development";

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
    fallback: {
      fs: false,
      path: require.resolve("path-browserify")
    }
  },
  performance: {
    hints: false
  },
  watch: !is_production
};
