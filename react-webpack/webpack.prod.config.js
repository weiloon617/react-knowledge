const path = require('path')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    chunkFilename: '[id].js',
    publicPath: '',
  },
  resolve: {
    extensions: ['.js', '.jsx'], // when import js and jsx file, we no need to write .js or .jsx
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' }, // extract all the css and inject on the top of html file, to reduced file download
          {
            loader: 'css-loader', // parsing css from .css file
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader', // transform the css
            options: {
              ident: 'postcss',
              plugins: () => [
                autoprefixer({
                  browsers: ['> 1%', 'last 2 versions'],
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url-loader?limit=8000&name=images/[name].[ext]', // if limit size is exceed 8bytes and then it will store as file or else will convert as 64 based url
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ],
}
