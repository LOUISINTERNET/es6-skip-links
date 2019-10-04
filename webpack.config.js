var path = require('path')
var webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'skip-links.js',
    library: 'skipLinks',
    libraryTarget: 'var',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
}
