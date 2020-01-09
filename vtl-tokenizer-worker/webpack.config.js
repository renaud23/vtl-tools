const path = require("path");

module.exports = {
  entry: {
    bundle: path.join(__dirname, "./src/index.js")
  },

  output: {
    filename: "worker-vtl-2.0-insee.js",
    path: path.join(__dirname, "dist")
  },

  mode: process.env.NODE_ENV || "development",

  watchOptions: {
    ignored: /node_modules|dist|\.js/g
  },

  devtool: "cheap-module-eval-source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    plugins: []
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"]
          }
        }
      }
    ]
  },
  node: {
    fs: "empty"
  }
};
