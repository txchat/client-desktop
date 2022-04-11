import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { mainProcessStore } from './store'

export function createExpressApp(): Promise<void> {
    return new Promise((resolve) => {
        const expressApp = express()
        expressApp.use('/', express.static(__dirname + '/'))
        // 代理网页内的所有请求
        expressApp.use(
            ['/disc', '/app', '/backup', '/oss', '/okr', '/okrpc', '/oa', '/oa-admin', '/proxyApi', '/license'],
            createProxyMiddleware({
                target: process.env.VUE_APP_BASE_URL,
                changeOrigin: true,
                followRedirects: true,
            })
        )
        expressApp.listen(mainProcessStore.port, mainProcessStore.hostname, () => {
            resolve()
        })
    })
}
