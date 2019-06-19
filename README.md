# util-helpers

![GitHub](https://img.shields.io/github/license/doly-dev/util-helpers.svg)
[![Build Status](https://travis-ci.org/doly-dev/util-helpers.svg?branch=master)](https://travis-ci.org/doly-dev/util-helpers)

[util-helpers](https://doly-dev.github.io/util-helpers/index.html) 是一个基于业务场景的工具方法库，支持 `umd` （即 `es6`、`amd`、`cmd`、`全局` 等都可使用）。如果你需要的是基础工具方法，请使用 [Lodash](https://www.lodashjs.com/)、[Moment](http://momentjs.cn/)、[Dayjs](https://github.com/iamkun/dayjs)

*使用前请阅读[文档](https://doly-dev.github.io/util-helpers/index.html)，注意是否符合你的业务逻辑。*

## 使用

**`npm` 或 `yarn` 安装**

```shell
npm install util-helpers --save
```

```shell
yarn add util-helpers
```

**浏览器引入**

在浏览器中使用 `script` 标签直接引入文件，并使用全局变量 `utilHelpers` 。

`npm` 包的 `util-helpers/dist` 目录下提供了 `util-helpers.js` 以及 `util-helpers.min.js`。你也可以通过 [UNPKG](https://unpkg.com/util-helpers@latest/dist/) 进行下载。

> 强烈不推荐使用已构建文件，这样无法按需加载。

**示例**

```javascript
import { isPhoneNumber } from 'util-helpers'

isPhoneNumber(13000000000) // => true
```

**按需引入**

该方式只加载用到的方法，减小最后构建的资源体积。

```javascript
import isPhoneNumber from 'util-helpers/lib/isPhoneNumber'
```

## 文档

### 格式化

- 日期时间 `待开发`
- 金额 `待开发`
- 银行卡 `待开发`
- 数字转中文 `待开发`
- 数字转罗马数字 `待开发`

### 校验

- [isPhoneNumber](https://doly-dev.github.io/util-helpers/global.html#isPhoneNumber) 检测值是否为11位有效手机号码
- 身份证 `待开发`
- 邮箱 `待开发`
- 银行卡 `待开发`
- URL `待开发`
- 密码二级强度 `待开发`
- 密码三级强度 `待开发`

### 解析

- 身份证（地址、生日、性别、年龄） `待开发`
- URL `待开发`

### 安全计算

- 加减乘除 `待开发`

### 其他

- 脱敏 `待开发`
- 缓存（cookie、localStore、sessionStore） `待开发`












