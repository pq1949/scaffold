var HtmlWebpackPlugin = require('html-webpack-plugin'),
  path = require('path'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  webpack = require('webpack');
var nodeModulesPath = './mode_modules';
var production = process.env.NODE_ENV === 'production';
var plugins = [new webpack.optimize.CommonsChunkPlugin({
  name: 'main',
  // Move dependencies to our main file
  children: true,
  // Look for common dependencies in all children,
  minChunks: 2,
  // How many times a dependency must come up before being extracted
}),];

if (production) {
  plugins = plugins.concat([
    // Production plugins go here
  ]);
}

module.exports = {
  devtool: 'source-map',
  entry: {
    'app': './index.js'
  },
  output: {
    filename: '[name].js',
    path: './build'
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      template:'./indexTemplate.html'
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ],
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        include: [path.resolve(__dirname, "src/components/**/*.js")],
        exclude: [nodeModulesPath]
      },
      {
        test: /\.(css|scss)$/,
        loader: 'stylelint-loader',
        include: [path.resolve(__dirname, "src/components/**/*.scss")],
        exclude: [nodeModulesPath]
      },
      {
        test: /\.(css|less)$/,
        loader: 'stylelint-loader',
        include: [path.resolve(__dirname, "src/components/**/*.less")],
        exclude: [nodeModulesPath]
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel?presets=es2015'
      },
      {test: /\.css/, loader: 'style-loader!css-loader'},
      {test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader'},
      {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
      {test: /\.(eot|ttf|woff|woff2|svg)$/, loader: 'file?name=fonts/[name].[ext]'}
    ]
  }
};
if (process.env.NODE_ENV !== 'production') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // }),
    //为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
    new webpack.optimize.OccurenceOrderPlugin()
  ])
}

