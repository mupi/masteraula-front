/*const webpack = require("webpack");

module.exports = function () {
  return {
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }]
    },
    devServer: {
      historyApiFallback: true,
    },
    resolve: {
      alias: {
        "react-dom": "react-dom/profiling",
        "scheduler/tracing": "scheduler/tracing-profiling"
      }
    }
  };
};*/