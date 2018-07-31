var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './src/main.js'
  ],
  output: {
    filename: './lib/skip-links.js',
    library: 'skipLinks',
    libraryTarget: 'var'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader',
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015']
        }
      }
    ]
  }
}
