const path = require("path");

module.exports = {
  entry: {
    genshinwidget_lite: "./genshinwidget_lite.js",
    genshinwidget_lite_stacked: "./genshinwidget_lite_stacked.js",
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.png$/,
        loader: "url-loader",
        options: {
          limit: 200 * 1000,
        },
      },
    ],
  },
};
