// 通用颜色表, Quasar 和 Tailwind 都从这里读取自定义颜色

const colors = {
    primary: '#32B2F7', // 主题色，用于突出文字、按钮
    secondary: '#EAF6FF', // 辅助色，用于模块背景、按钮
    bubble: '#C1E9FF', // 用于会话气泡
    dark: '#24374E', // 主要文字
    subtle: '#8A97A5', // 次要文字，说明文字
    'dark-subtle': '#5A6570', // 介于黑色和灰色之间的颜色, 常用在关闭按钮
    positive: '#62DEAD',
    'positive-light': '#E6F7F1',
    negative: '#DD5F5F',
    'negative-light': '#FAEEEE',
    warn: '#FFDF5F',
    orange: '#EFA019',
    'orange-light': '#FEF5E5',
    gold: '#E6C8A5',
    'gray-1': '#F6F7F8', // 背景色，用于页面背景、输入框
    'gray-2': '#FAFBFB', // 用于列表模块背景
    'gray-3': '#F3F4F4', // 用于置顶状态时背景
    'gray-4': '#EDEEF0', // 用于选中状态时背景
    'gray-5': '#BFCDD9', // 用于部分关闭按钮
}

module.exports = colors
