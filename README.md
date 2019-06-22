# util-helpers

![GitHub](https://img.shields.io/github/license/doly-dev/util-helpers.svg)
[![Build Status](https://travis-ci.org/doly-dev/util-helpers.svg?branch=master)](https://travis-ci.org/doly-dev/util-helpers)

[util-helpers](https://doly-dev.github.io/util-helpers/index.html) 是一个基于业务场景的工具方法库。

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
import { pattern } from 'util-helpers'

pattern.isPhone("13000000000") // => true
```

**按需引入**

该方式只加载用到的方法。

```javascript
import pattern from 'util-helpers/lib/pattern'
```

## 文档

- [formatDate](https://doly-dev.github.io/util-helpers/module-formatDate.html) 日期时间格式化
- [formatMoney](https://doly-dev.github.io/util-helpers/module-formatMoney.html) 金额格式化
- 银行卡格式化 `待开发`
- 数字转中文 `待开发`
- 数字转罗马数字 `待开发`
- 身份证解析（地址、生日、性别、年龄） `待开发`
- 脱敏 `待开发`
- [pattern](https://doly-dev.github.io/util-helpers/module-pattern.html) 正则匹配
    - [isPhone](https://doly-dev.github.io/util-helpers/module-pattern_isPhone.html) 手机号码
    - 固定电话 `待开发`
    - 400电话 `待开发`
    - 邮政编码 `待开发`
    - 中文 `待开发`
    - 身份证 `待开发`
    - 邮箱 `待开发`
    - 银行卡 `待开发`
    - URL `待开发`
    - 密码强度 `待开发`
    - 护照 `待开发`
    - 港澳台通行证 `待开发`
    - 日期 `待开发`
    - [isQQ](https://doly-dev.github.io/util-helpers/module-pattern_isQQ.html) QQ号
    - 微信号 `待开发`
    - 车牌号 `待开发`
    - 十六进制颜色 `待开发`
    - IPv4地址 `待开发`
- [type](https://doly-dev.github.io/util-helpers/module-type.html) 类型检测
    - [isArguments](https://doly-dev.github.io/util-helpers/module-type_isArguments.html) Arguments
    - [isDate](https://doly-dev.github.io/util-helpers/module-type_isDate.html) Date
    - [RegExp](https://doly-dev.github.io/util-helpers/module-type_RegExp.html) RegExp

## 精选第三方工具库

- [lodash](https://www.npmjs.com/package/lodash) - 封装了诸多对字符串、数组、对象等常见数据类型的处理函数
- [query-string](https://www.npmjs.com/package/query-string) - URL解析、序列化
- [js-cookie](https://www.npmjs.com/package/js-cookie) - 一个简单，轻量级的JavaScript API，用于处理cookie
- [number-precision](https://www.npmjs.com/package/number-precision) - 使用javascript精确地执行加法，减法，乘法和除法运算
- [moment](http://momentjs.cn/) - JavaScript 日期处理类库
- [dayjs](https://github.com/iamkun/dayjs) - 一个轻量的处理时间和日期的 JavaScript 库，和 Moment.js 的 API 设计保持完全一样



