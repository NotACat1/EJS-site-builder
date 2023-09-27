const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const path = require('path')
console.log(path.resolve(__dirname + '/src/blocks'))

const sitiesData = require('./src/data/cities.json')
const templateParameters = {
  sitiesEurope: sitiesData.europe,
  sitiesAsia: sitiesData.asia,
}

module.exports = {
  entry: './src/pages/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    open: true,
  },
  resolve: {
    alias: {
      '@blocks': path.resolve(__dirname + '/src/blocks'),
      '@data': path.resolve(__dirname + '/src/data'),
      '@fonts': path.resolve(__dirname + '/src/fonts'),
      '@pages': path.resolve(__dirname + '/src/pages'),
      '@scss': path.resolve(__dirname + '/src/scss'),
      '@templates': path.resolve(__dirname + '/src/templates'),
    },
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                includePaths: ['src/scss'],
              },
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.ejs$/,
        loader: 'ejs-webpack-loader',
        options: {
          esModule: false,
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg|bmp|tiff?|ico|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[hash][ext][query]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)?$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/pages/index.html',
      filename: 'index.html',
      templateParameters,
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
}
