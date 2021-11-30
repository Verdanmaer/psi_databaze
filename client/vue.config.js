const path = require('path');

module.exports = {
  publicPath: "./",
  outputDir: path.resolve(__dirname, "../server/public"),

  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000'
      }
    }
  },

  transpileDependencies: [
    'vuetify'
  ],

  chainWebpack: (config) => {
    config.module
      .rule('images')
        .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
        .use('url-loader')
          .loader('url-loader')
          .end()
  }
}
