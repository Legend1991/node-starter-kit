"use strict";

const AssetsPlugin = require('assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const fs = require('fs');

const NODE_ENV = process.env.NODE_ENV || 'dev';

module.exports = {
  context: path.resolve(__dirname, './frontend/src'),
  entry: {
    app: ["babel-polyfill", "./app.js"]
  },
  output: {
    path: path.resolve(__dirname, './frontend/public/build'),
    filename: 'app.[chunkhash].js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015', 'react', 'stage-2'] }
        }],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            query:  {
              options: {
                modules: true
              }
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: [
          {
            loader: "url-loader"
          }
        ]
      }
    ],
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 100
  },
  plugins: [
    new AssetsPlugin({
      filename: 'assets.json',
      path: path.resolve(__dirname, './frontend/public/build')
    }),
    new CleanWebpackPlugin(['build'], {
      root: path.resolve(__dirname, './frontend/public/'),
      verbose: true,
      dry: false,
      exclude: []
    })
  ],
  devtool: NODE_ENV == 'dev-source-map' ? 'source-map' : undefined
};