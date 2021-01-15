const path = require('path');

const SRC_FILE = path.join(__dirname, './client/src/index.jsx');
const DIST_DIR = path.join(__dirname, './client/public');

module.exports = {
  entry: SRC_FILE,
  output: {
    path: DIST_DIR,
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: 'babel-loader'
      }
    ]
  },
  mode: 'development'
};
