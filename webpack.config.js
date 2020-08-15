const path = require("path");

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const httpNode = require("./webpack/http-node");

/**
 * @type {import("webpack").Configuration}
 */
module.exports = {
  target: httpNode,
  entry: path.resolve(__dirname, "src/noop.js"),
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3001,
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "commonjs-module",
    publicPath: (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) || "http://localhost:3001"
  },
  mode: "production",
  devtool: "source-map",
  optimization: {
    minimize: true
  },
  resolve: {
    alias: {
      bufferutil: false,
      encoding: false,
      "utf-8-validate": false,
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: "babel-loader"
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "federated_gql_server",
      filename: "remote-entry.js",
      library: { type: "commonjs-module" },
      exposes: {
        "./server": "./src/server.js"
      }
    })
  ]
};