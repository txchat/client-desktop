# 项目启动

项目启动前需确保进行以下操作, 否则项目可能无法正常工作

## 依赖安装

项目下载到本地后运行:

```sh
npm install
```

之所以使用 npm 而不是 yarn 或 pnpm, 是因为项目依赖的 [electron-builder](https://www.electron.build/) 对后者的支持存在某些问题, 启动项目会报错.

## 镜像加速

安装 Electron 包时, 会下载二进制文件, 而默认路线很慢. 可以配置镜像以提升下载速度.

-   方式一

在安装命令前面加 `ELECTRON_MIRROR` 环境变量, 以加快 Electron 二进制文件下载速度

```sh
ELECTRON_MIRROR="https://cdn.npm.taobao.org/dist/electron/" npm install
```

-   方式二 (推荐)

[参考这篇文章](https://antfu.me/posts/npm-binary-mirrors)

## 环境变量

### 新建 `.env.local` 文件, 设置私有环境变量

需在本地工作路径新建 `.env.local` 文件, 设置代扣钱包私钥。如果不设置, 区块链写入操作无法成功。

在其中输入内容:

```sh
VUE_APP_NO_BALANCE_PRIVKEY=xxx
```

等号后面的 `xxx` 替换为你想在项目中使用的代扣钱包的私钥。
