const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  context: __dirname,
  target: "web",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'presentation-maps.js',
    publicPath: '/dist/',
    library: "presentation-maps",
    globalObject: 'this',
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  externals: {
    'presentation-decorator': {
      commonjs: 'presentation-decorator',
      commonjs2: 'presentation-decorator',
      amd: 'presentation-decorator',
      root: 'presentation-decorator'
    },
    'load-google-maps-api': {
      commonjs: 'load-google-maps-api',
      commonjs2: 'load-google-maps-api',
      amd: 'load-google-maps-api',
      root: 'load-google-maps-api'
    }
  },
  stats: "errors-only",
  devtool: "source-map",
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require("./package.json").version)
    })
  ]
};
