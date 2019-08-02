const path = require('path');
const webpack = require('webpack');
const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
  mode: 'development',
  entry: './static/apps/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js',
    publicPath: ASSET_PATH
  },

  devtool: 'source-map',

  watch: true,
      plugins: [
        new webpack.ProvidePlugin({
           jQuery: "jquery"
       })
    ],
  module: {
    rules: [
      {
        test: /.hbs$/,
        loader: "handlebars-loader"
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|eot|apng|gif|webm|svg|ttf|otf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },

    ],
  },
};
