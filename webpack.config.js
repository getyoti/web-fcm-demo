const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  devServer: {
    https: true,
    static: "./public",
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
