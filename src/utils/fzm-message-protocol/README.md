# protobufjs 笔记

> Google Protocol Buffer （简称 Protobuf） 是一种轻便高效的结构化数据存储格式，平台无关、语言无关、可扩展，可用于通讯协议和数据存储等领域。

`protobufjs` 是谷歌官方提供的，用于在 JavaScript 中使用 `Protobuf`。

如果你还不了解 protobufjs，推荐先阅读[这篇文章](https://juejin.cn/post/6844903699458818062)。

## 使用 `pbjs`

本目录下的 `protobuf.js` 和 `protobuf.d.ts` 由 `protobufjs` 自带的命令行工具 `pbjs` 生成，源文件是目录下的 `comet.proto`。

执行下面的命令之前先确保局部安装了 [protobufjs](https://www.npmjs.com/package/protobufjs)。

### 生成的 `.js` 文件

生成的 `.js` 文件可以将相应的数据结构构造成 `protobuf` 格式的二进制数据（二进制数据在 JavaScript 中使用 Uint8Array 类型表示）。

```shell
npx pbjs -t static-module -w es6  -o src/utils/fzm-message-protocol/protobuf.js src/utils/fzm-message-protocol/comet.proto
```

### 生成的 `.d.ts` 文件

生成的 `.d.ts` 文件使得 TypeScript 项目获得完整的代码提示。

```shell
npx pbts -o src/utils/fzm-message-protocol/protobuf.d.ts src/utils/fzm-message-protocol/protobuf.js
```

## 使用方法

例如有个 `proto 文件` 如下：

```proto
package demo.proto;

message Person {
    string name = 1;
    int32 age = 2;
}
```

其中第一行为包名，下面的 `message Proto {...}` 为一个数据结构。要在 TypeScript 中将对应的 Object 编码成 proto 格式的二进制流，只需要：

```TypeScript
import { demo } from '...'

const person = { name: '张三', age: 18 }
const dataEncoded = dtalk.proto.Person.encode(person).finish()
// dataEncoded 为 UInt8Array 类型，可以被解码回 `{ name: '张三', age: 18 }`
```

由于 protobuf 为我们生成了 `.d.ts` 文件，因此在书写代码时能获得智能提示：

![](http://image-hosting-service.oss-cn-hangzhou.aliyuncs.com/20210512_%E5%B1%8F%E5%B9%95%E5%BD%95%E5%88%B62021-05-12%2011.13.17.jpg)

上图中的 `dtalk.proto.Proto` 是一个 [Type](https://protobufjs.github.io/protobuf.js/Type.html), 可以直接对目标 Object 编码。
