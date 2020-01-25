const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      Colors: path.join(__dirname, 'src/data/colors.json'),
      Data: path.join(__dirname, 'src/data/'),
      Common: path.join(__dirname, 'src/components/common/'),
      Icon: path.join(__dirname, 'src/components/common/Icon.jsx'),
      Constants: path.join(__dirname, 'src/data/constants.js'),
      Assets: path.join(__dirname, 'assets/'),
    },
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    port: 3003,
    open: true,
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(pdf|png|svg|jpg|gif|woff(2)?|ttf)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|webp)$/,
        use: [
          'webp-loader',
          'file-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new CopyPlugin([
      { from: 'assets', to: 'assets' },
      { from: '_redirects', to: '_redirects', toType: 'file' },
    ]),
  ],
};
