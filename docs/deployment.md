# 部署

## 新版本上线步骤

上线新版本时, 需严格执行, 以保证用户的桌面端老版本客户端能够获取更新通知. 

1. 新版本的内容经测试通过后, 将代码合并至 `main` 分支
2. 在 `main` 分支中, 打开 `package.json`, 然后:
   1. 设置新的 `version` 字段, 如 `1.10.0`
   2. `versionCode` 字段 + 1
3. 提交 `main` 分支, `commit message` 为: `release: bump version`
4. 为该 `commit` 添加 `tag`, 值与上方 `version` 字段所填的相同, 如 `1.10.0`
5. push tag
6. 运行下面的打包命令, 生成生产环境包

## 打包

使用以下命令一键打包 Web + 桌面客户端: 

``` sh
npm run build && npm run electron:build-release
```

### 多个项目方

如果需要根据不同项目方构建不同的版本, 需先设置环境 `THEME` 变量, 参考 `package.json` 中的 `serve:police` 脚本, 以及 `src/assets/themes/` 文件夹.

### Electron 构建注意事项

构建 macOS 版本的 App 需要 `Signing` 步骤没有问题, 如下图所示:

![1](/images/electron-signing.png)

如果构建时这一步骤前面的点是黄色，Mac 版本的截图会不正常。

`Signing` 步骤需本地存在开发者账户,可在 Mac 电脑上安装 Xcode, 然后登录一个开发者账号，最后回到项目进行构建即可。

## 部署脚本参考

``` sh
tar -czf dist.tar dist
scp dist.tar root@your-domin.com:/home/tanxin/dist.tar
rm -rf dist.tar
ssh root@your-domin.com 'cd /home/tanxin && tar -xzf dist.tar && rm -rf dist.tar && rm web -rf && mv dist web'
echo 'https://your-domin.com/web/ done'
```
## Nginx 配置参考

::: warning
由于项目中使用了浏览器原生的 [Crypto API](https://developer.mozilla.org/zh-CN/docs/Web/API/Crypto) 来对助记词、聊天消息加解密，而这些 API 只能在 https 环境下起作用，所以**部署的网站必须能够通过 https 访问**，否则无法正常使用。参考[这里](https://developer.mozilla.org/zh-CN/docs/Web/API/Crypto/subtle)。
:::

```nginx
server {
    listen   80;
    server_name your-domin.com;

    location / {
        rewrite ^(.*) https://your-domin.com$1 permanent;
    }
}

server {
    listen       443 ssl;
    listen       [::]:443 ssl http2;
    server_name  your-domin.com;
    root      /home/tanxin;

    ssl_certificate "你的 SSL 证书路径";
    ssl_certificate_key "你的 SSL 证书秘钥路径";
    ssl_session_cache shared:SSL:1m;
    ssl_session_timeout  10m;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # 谈信下载页
    location / {
        index /download/download.html;
    }

    ## 谈信网页版
    location /web/ {
        index /web/index.html;
    }

    ## 企业模块 H5
    location /oa/ {
          try_files $uri $uri/ /oa/index.html;
    }

    ## 二维码跳转页
    location /group-code/ {
          try_files $uri $uri/ /group-code/index.html;
    }

    ## 二维码跳转页 v2
    location /group-code-v2/ {
          try_files $uri $uri/ /group-code-v2/index.html;
    }

    ## okr模块 pc
    location /okrpc {
          try_files $uri $uri/ /okrpc/index.html;
    }

    ## okr模块 H5
    location /okr/ {
          try_files $uri $uri/ /okr/index.html;
    }

    ## 企业管理后台
    location /oa-admin/ {
          try_files $uri $uri/ /oa-admin/index.html;
    }

    ## 企业模块后端
    location /proxyApi {
        proxy_pass http://172.16.101.107:20000/;
    }

    ## okr模块后端
    location /api {
      proxy_pass http://172.16.101.107:20001/;
    }


    #######################################
    #### 注意！！！
    #### nginx http 处配置需修改 HTTP 请求上传文件大小限制 client_max_body_size 6M;
    #######################################
    location ~/(disc|backup|oss|app)/ {
    	proxy_pass http://172.16.101.107:8888;
    }

    # 谈信后台管理系统
    location /admin/ {
        try_files $uri $uri/ /admin/index.html;
    }

    # 谈信后台管理系统的后端接口
    location /backend/ {
        proxy_pass http://172.16.101.107:8888;
    }

    # 谈信用户协议
    location /license/ {
        try_files $uri $uri/ /license/index.html;
    }
}
```
