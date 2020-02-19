module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  configureWebpack: {
    //Necessary to run npm link https://webpack.js.org/configuration/resolve/#resolve-symlinks
    resolve: {
       symlinks: false
    }
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:8000', //FOR LOCAL DEV
        // target: 'https://api-thesis-2.herokuapp.com', // FOR PROD
        ws: true,
        changeOrigin: true
      }
    }
  }

}
