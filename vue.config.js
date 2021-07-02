module.exports = {
    publicPath: './',
    outputDir: 'build',
    devServer: {
        port: 57104, // 端口号配置
        disableHostCheck: true,
        // proxyTable: {     // axios跨域处理
        //     '/api': {       // 此处并非和url一致
        //       // target:'http://192.168.0.165/repair/',
        //       target:'http://xhjs.hzxh.gov.cn/',
        //       changeOrigin:true, //允许跨域
        //       pathRewrite:{
        //         '^/api': ''
        //       }
        //     }
        //   }
    },
    configureWebpack: {//打包过滤
        externals: {
            'AMap': 'AMap',
            // 'echarts': 'echarts'
        }
    },
}