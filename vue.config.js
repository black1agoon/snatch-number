const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  assetsDir: 'static',
  devServer: {
    port: 8033,
    proxy: {
      '/api2': {
        target: 'https://hnga.zhihuishitang.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/api2': ''
        },
        logLevel: 'debug' // 打印代理日志
      },
      '^/api': {
        target: 'https://www.forzadata.cn/',
      },
    },
  },
})
