const webpackHotDevClientPath = require('af-webpack/lib/reactDevUtils');

var entryObj = {
  index: './src/index.js',
};

if (process.env.NODE_ENV === 'development') {
  entryObj = Object.entries(entryObj).reduce(
    (memo, [key, value]) =>
      !Array.isArray(value)
        ? {
            ...memo,
            [key]: [webpackHotDevClientPath.webpackHotDevClientPath, value],
          }
        : {
            ...memo,
            [key]: value,
          },
    {},
  );
}

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080/',
        changeOrigin: true,
        headers: {
          Accept: 'application/json',
        },
      },
    },
    historyApiFallback: true,
    hot: true,
  },
  externals: {
    BMap: 'BMap',
  },

  extraBabelPlugins: [
    // ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
    // '@babel/plugin-proposal-class-properties',
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }],
  ],
  extraBabelPresets: [require.resolve('babel-preset-umi'), '@babel/preset-react'],
  hash: true,
  entry: entryObj,
  urlLoaderExcludes: [/\.html$/, /\.ejs/],
  chainConfig: function(webpackConfig) {
    webpackConfig.output.publicPath('/');

    webpackConfig.plugin('html-webpack-plugin').use(require('html-webpack-plugin'), [
      {
        template: './src/index.ejs',
        title: 'R',
        favicon: './asset/r.png',
      },
    ]);
  },
};
