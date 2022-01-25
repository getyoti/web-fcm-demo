const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  stats: "errors-only",

  devServer: {
    devMiddleware: {
      stats: "minimal",
    },
    https: true,
    static: "./public",
    proxy: {
      "/api": "http://localhost:5000",
    },
  },

  resolve: {
    alias: {
      // Avoid having react twice because of the local dependency
      react: path.resolve("./node_modules/react"),
    },
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          // Declare babel options here, rather than in .babelrc, to make sure
          // all the js files are resolved, including the ../.. ones
          options: {
            presets: [
              // Avoid babel errors with these extra options
              [
                "@babel/preset-env",
                {
                  targets: {
                    esmodules: true,
                  },
                },
              ],
              "@babel/preset-react",
            ],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: "public/index.html",
      favicon: "public/favicon.png",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "./node_modules/@getyoti/react-face-capture/assets",
          to: "./assets",
        },
      ],
    }),
  ],
};
