# 登录设备信息的编解码

连接服务器时, 需携带登录设备信息, 通过本工具编码

需求参考: https://confluence.33.cn/pages/viewpage.action?pageId=41256537

## protobuf to code

### 生成 js

```shell
npx pbjs -t static-module -w es6  -o src/utils/login-codec/loginInfo.js src/utils/login-codec/login.proto
```

### 生成 ts

```shell
npx pbts -o src/utils/login-codec/loginInfo.d.ts src/utils/login-codec/loginInfo.js
```
