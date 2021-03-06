const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')

const { NODE_ENV, BUNDLE_ANALYZER, ASSET_PATH = '/', HISTORY_HASH } = process.env
const isProd = NODE_ENV === 'production'

module.exports = function exports() {
  const plugins = [
    new HtmlPlugin({ template: './src/static/index.html' }),
    new MiniCssExtractPlugin({
      filename: 'styles.[hash].css',
      hashDigestLength: 6
    }),

    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
      'process.env.HISTORY_HASH': !!HISTORY_HASH
      // 'process.env.API_URL': JSON.stringify(API_URL)
    }),

    // To strip all locales except “en”
    new MomentLocalesPlugin()

    // Or: To strip all locales except “en”, “es-us” and “ru”
    // (“en” is built into Moment and can’t be removed)
    // new MomentLocalesPlugin({
    //   localesToKeep: ['es-us', 'ru'],
    // }),
  ]

  if (BUNDLE_ANALYZER === 'localhost') {
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerHost: 'localhost',
        analyzerPort: 8081
      })
    )
  }

  const resolveAlias = {
    '@': path.resolve(__dirname, 'src')
  }

  if (!isProd) {
    resolveAlias['react-dom'] = '@hot-loader/react-dom'
  }

  return {
    mode: isProd ? 'production' : 'development',
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'build'),
      publicPath: ASSET_PATH,
      filename: 'bundle.[hash].js',
      hashDigestLength: 6
    },
    resolve: {
      alias: resolveAlias,
      extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: { hmr: !isProd }
            },
            {
              loader: 'css-loader',
              options: { sourceMap: !isProd }
            }
          ]
        },
        {
          test: /\.tsx?$/,
          include: path.resolve(__dirname, 'src'),
          use: [{ loader: 'babel-loader' }]
        },
        {
          test: /\.(woff2|jpg|png)$/,
          include: path.resolve(__dirname, 'src'),
          loader: 'file-loader'
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack']
        }
      ]
    },
    plugins,
    devServer: {
      port: 9000,
      historyApiFallback: true,
      compress: true,
      stats: false
    },
    devtool: isProd ? 'none' : 'source-map',
    stats: false
  }
}
