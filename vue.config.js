/* eslint-disable */

const path = require('path')
const { themeRoot } = require('./theme')

module.exports = {
    outputDir: `dist${!!process.env.THEME ? '_' + process.env.THEME : ''}`,
    publicPath: process.env.VUE_APP_ELECTRON_ENV === 'true' ? '/' : '/web/',
    chainWebpack: (config) => {
        config.plugin('html').tap((args) => {
            args[0].title = require(themeRoot + 'theme.config.js').appName
            args[0].favicon = path.join(themeRoot, 'icons/favicon.ico')
            return args
        })
        // 自定义全局变量
        config.plugin('define').tap((definitions) => {
            definitions[0] = Object.assign(definitions[0], {
                VERSION: JSON.stringify(require('./package.json').version),
                VERSION_CODE: JSON.stringify(require('./package.json').versionCode),
            })
            return definitions
        })
        config.resolve.alias
            .set('images', path.join(__dirname, 'src/assets/images/'))
            .set('icons', path.join(__dirname, 'src/assets/icons/'))
            .set('theme', themeRoot)
            .set('themeConfig', themeRoot + 'theme.config.js')
        config.module
            .rule('favico')
            .test(/\.ico$/)
            .use('url')
            .loader('url-loader')
            .options({ limit: 0, name: 'config/images/[name].[ext]' })
        config.optimization.splitChunks({
            chunks: 'all',
            cacheGroups: {
                vendors: {
                    name: 'vendors',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -20,
                    enforce: true,
                },
                quasar: {
                    test: /[\\/]node_modules[\\/]@?quasar[\\/]/,
                    priority: -10,
                },
                'pinyin-pro': {
                    test: /[\\/]node_modules[\\/]pinyin-pro[\\/]/,
                    priority: -10,
                },
            },
        })
    },
    pluginOptions: {
        quasar: {
            importStrategy: 'kebab',
            rtlSupport: false,
        },
        electronBuilder: {
            preload: 'src/electron/preload.js',
            builderOptions: {
                appId: 'com.3syxin',
                productName: '谈信',
                mac: {
                    target: [
                        {
                            target: 'dmg',
                            arch: ['universal'],
                        },
                    ],
                    icon: 'build/icons/icon.icns',
                    artifactName: '${productName}-${os}-${version}-${arch}.${ext}',
                },
                win: {
                    target: [
                        {
                            target: 'nsis',
                            arch: ['x64'],
                        },
                    ],
                    publisherName: '谈信官方',
                    icon: 'build/icons/icon.ico',
                    publish: ['github'],
                },
                extraResources: [
                    {
                        from: './public/bin/screencap/PrintScr.exe',
                        to: './extraResources/PrintScr.exe',
                    },
                    {
                        from: './public/bin/screencap/PrScrn.dll',
                        to: './extraResources/PrScrn.dll',
                    },
                ],
            },
        },
    },
    transpileDependencies: ['quasar'],
    devServer: {
        proxy: {
            '^(/disc)|(/backup)|(/oss)|(/app)': { target: 'http://172.16.101.107:8888' },
            '^/license': { target: 'https://3syxin.com/license' },
            '^(/oa-admin)|(/oa)|(/okr)|(/okrpc)': { target: 'http://test-chat33pro.xzd.me' },
        },
    },
}
