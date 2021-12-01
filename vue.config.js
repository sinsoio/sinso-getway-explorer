const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
let publicPath = '/'
module.exports = {
  publicPath,
  productionSourceMap: false,
  devServer: {
    // proxy: process.env.VUE_APP_API,
    // port: 8991,
    proxy: {
      '/proxyApi': {
        target: process.env.VUE_APP_API,
        changOrigin: true,
        pathRewrite: {
          '^/proxyApi': '',
        },
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/styles/variables.scss";',
      },
    },
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()
  },
}
