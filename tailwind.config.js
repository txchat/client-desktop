/* eslint-disable */

/** 自定义颜色 */
const { themeRoot } = require('./theme')
const colors = require(themeRoot + '/colors.config')

const colorKeys = Object.keys(colors)
const bgColorClassList = colorKeys.map((k) => 'bg-' + k)
const textColorClassList = colorKeys.map((k) => 'text-' + k)

/** 移除的 Quasar class */
const { conflictingClasses } = require('./.postcssrc')

module.exports = {
    purge: {
        content: ['./src/**/*.vue'],
        options: {
            safelist: [
                // 某些 Quasar 组件会**隐式地**用到自定义颜色对应的 class
                // 如 <q-btn color="primary"> ... </q-btn> 内部会为元素添加 `.bg-primary`
                // 在构建生产包时，Tailwind 无法识别到  `.bg-primary` 被使用，因此默认将其移除
                // 因此这里需确保 Quasar 隐式调用这些自定义颜色的 class 不被移除
                ...bgColorClassList,
                ...textColorClassList,
                // 确保被移除的这些 Quasar class 对应的 Tailwind class 不被移除
                ...conflictingClasses,
            ],
        },
    },

    theme: {
        extend: {
            colors,
            spacing: {
                13: '3.25rem',
                15: '3.75rem',
                18: '4.5rem',
            },
            zIndex: {
                1: '1',
                '-1': '-1',
            },
            minHeight: {
                32: '8rem',
            },
            borderRadius: {
                'text-msg-bubble-opposite': '3pt  20pt  20pt  20pt',
                'text-msg-bubble-myself': '20pt  3pt  20pt  20pt',
                'forward-msg-bubble-opposite': '4px 18px 18px 18px ',
                'forward-msg-bubble-myself': '18px 4px 18px 18px  ',
            },
        },
    },

    plugins: [require('@tailwindcss/line-clamp')],

    variants: {
        extend: {
            padding: ['last'],
        },
    },
}
