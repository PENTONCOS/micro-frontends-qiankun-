module.exports = {
  devServer: {
    port: 5500,
  },
  chainWebpack: config => {
    config.plugin('html')
      .tap((args) => {
        args[0].title = '飞象企服微前端demo'
        return args
      })
  }
};