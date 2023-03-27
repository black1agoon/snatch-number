const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  assetsDir: 'static',
  devServer: {
    port: 8033,
    proxy: {
      '^/api': {
        target: 'https://www.forzadata.cn/',
      },
    },
  },
})
