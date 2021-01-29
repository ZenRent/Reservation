const path = require('path');

const SRC_FILE = path.join(__dirname, './client/src/index.jsx');
const DIST_DIR = path.join(__dirname, './client/public');

module.exports = {
  entry: SRC_FILE,
  output: {
    path: DIST_DIR,
    filename: 'app.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
            },
          },
        ],
      },
      {
        test: /\.(?:png|jpg|otf|ttf)$/,
        loader: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js'],
  },
};
