// webpack builda e mette anche a disposizione un server

const webpack = require("webpack");
const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

process.env.NODE_ENV = "development";

// si esporta un oggetto javascript per la configurazione

module.exports = {
  mode: "development",
  target: "web",
  // questo dev tool ci permettere di vedere il codice nel browser anche se è compilato/transpillato, per debugging
  devtool: "cheap-module-source-map",
  entry: "./src/index",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js",
  },
  devServer: {
    stats: "minimal",
    overlay: true,
    historyApiFallback: true,
    // per ultima versione di chrome
    disableHostCheck: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    https: false,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.ico",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /(\|.css)$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
