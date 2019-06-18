# util-helpers

![GitHub](https://img.shields.io/github/license/doly-dev/util-helpers.svg)
[![Build Status](https://travis-ci.org/doly-dev/util-helpers.svg?branch=master)](https://travis-ci.org/doly-dev/util-helpers)

[util-helpers](https://doly-dev.github.io/util-helpers/index.html) 是一个基于业务场景的工具方法库，支持 `umd` （即 `es6`、`amd`、`cmd` 等都可使用）。如果你需要的是基础工具方法，请使用 [Lodash](https://www.lodashjs.com/)、[Moment](http://momentjs.cn/)、[Dayjs](https://github.com/iamkun/dayjs)

*使用前请阅读[文档](https://doly-dev.github.io/util-helpers/index.html)，注意是否符合你的业务逻辑。*

## 使用

**安装依赖**

```shell
npm install util-helpers --save
```

**引入依赖**

```javascript
import { checkPhoneNumber } from 'util-helpers'
```

**也可以按需引入**

该方式只加载用到的方法

```javascript
import checkPhoneNumber from 'util-helpers/lib/checkPhoneNumber'
```

## 文档

### 格式化

- 日期时间 `待开发`
- 金额 `待开发`
- 银行卡 `待开发`
- 数字转中文 `待开发`
- 数字转罗马数字 `待开发`

### 正则校验

- [checkPhoneNumber](https://doly-dev.github.io/util-helpers/global.html#checkPhoneNumber) 手机号校验
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












