# 更新消息协议对应的 JavaScript 代码

```shell
npx pbjs --path src/utils/message-codec chat.proto --out src/utils/message-codec/protobuf.js --target static-module --wrap es6 --no-create --no-delimited --no-verify
```

# 更新 TypeScript 注解

```shell
npx pbts -o src/utils/message-codec/protobuf.d.ts src/utils/message-codec/protobuf.js
```

# 参考

[protobufjs 官方文档的命令行部分](https://protobufjs.github.io/protobuf.js/index.html#command-line)
