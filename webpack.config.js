const path = require("path");

module.exports = {
  
  entry: {
    genshinwidget_elite: "./genshinwidget_elite.js",
    //genshinwidget_lite_stacked: "./genshinwidget_lite_stacked.js",
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name]_bundle.js",
  },
  experiments: { topLevelAwait: true },
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
