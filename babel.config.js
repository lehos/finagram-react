// const { NODE_ENV } = process.env

module.exports = function exports(api) {
  api.cache(true)

  return {
    presets: [
      ['@babel/env', { modules: false }],
      '@babel/react',
      ['@babel/typescript', { allExtensions: true, isTSX: true }],
      'linaria/babel'
    ],
    plugins: [
      '@babel/transform-runtime',
      '@babel/syntax-dynamic-import',
      '@babel/proposal-class-properties',
      ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
    ],
    env: {
      development: {
        plugins: ['react-hot-loader/babel']
      }
    }
  }
}
