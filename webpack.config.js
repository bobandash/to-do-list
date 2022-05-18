const path = require('path');

module.exports = {
  entry: './src/jsFiles/index.js',
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.(svg)$/i,
        use: {
          loader: 'url-loader',
        },
      },
    ],
  },
};
