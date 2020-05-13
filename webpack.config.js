const ExtractTextPlugin = require('extract-text-webpack-plugin')
const devtool = process.env.NODE_ENV === 'production' ? false : 'source-map'

module.exports = {
  devtool,
  entry: [
    'whatwg-fetch',
    './lib/main.less',
    './lib/main.jsx',
  ],
  module: {
    rules: [
      {
        test: [/\.jsx?$/],
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        },
      },
      {
        test: [/\.less$/],
        exclude: /(node_modules)/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        }),
      },
    ],
  },
  output: {
    filename: './bundle.js'
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'bundle.css',
      disable: false,
      allChunks: true,
    }),
  ],
  resolve: {
    extensions: ['.less', '.js', '.jsx', '*'],
  },
}
