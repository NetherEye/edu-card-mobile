const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

module.exports = {
    devServer: {
        proxy: {
            '/proxy': {
                target: 'http://172.16.4.239:8123',
                // target: 'http://172.16.2.188:8123',
                // target: 'https://m.gzeducard.net',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/proxy': ''
                }
            }
        }
    },
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    autoprefixer(),
                    pxtorem({
                        rootValue: 37.5,
                        propList: ['*']
                    })
                ]
            }
        }
    }
};