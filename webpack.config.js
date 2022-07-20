var path = require("path");
var SRC_DIR = path.join(__dirname, "/client/src");
var DIST_DIR = path.join(__dirname, "/client/dist");


module.exports = {
  entry: `${SRC_DIR}/index.js`,
  mode: "development",
  output: {
    filename: "bundle.js",
    path: DIST_DIR,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader",],
      },
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: 'file-loader?name=./images/[name].[ext]',
      },
    ],
  }
};