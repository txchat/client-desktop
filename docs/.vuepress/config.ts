import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
    // site config
    lang: 'zh-CH',
    title: '谈信桌面端开发文档',
    base: '/client-desktop/',

    // theme and its config
    themeConfig: {
        logo: '/images/logo.svg',
        repo: 'txchat/client-desktop',
        repoLabel: '代码仓库',
        editLink: false,
        sidebar: [
            {
                text: '文档',
                children: ['/get-started.md', '/deployment.md', '/release-history.md'],
            },
        ],
        sidebarDepth: 1,
    },
})
