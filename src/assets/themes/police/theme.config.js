module.exports = {
    appName: '谈信公安版',

    /**
     * 首屏页面,  undefined 为默认页面, 'mobile' 为手机登录页
     */
    entryPage: 'mobile',

    /**
     * 禁止未加入企业的账号使用, 默认为 false
     * 如果设为 true, 登录后的首页会显示 "创建或加入团队" 页面作为替代
     */
    notNullEnterprise: true,

    /** 隐藏页面上的所有 "账号" */
    hideAddress: true,
}
