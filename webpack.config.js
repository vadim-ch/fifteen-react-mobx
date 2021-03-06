var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    './src/index'
  ],
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  resolve: {
    extensions: ['', '.js', '.ts', '.tsx']
  },
  module: {
    loaders: [{
      test: /\.tsx?$/,
      loaders: ['awesome-typescript-loader'],
      include: path.join(__dirname, 'src')
    }]
  }
};
