# util-helpers

![GitHub](https://img.shields.io/github/license/doly-dev/util-helpers.svg)
[![Build Status](https://travis-ci.org/doly-dev/util-helpers.svg?branch=master)](https://travis-ci.org/doly-dev/util-helpers)

[util-helpers](https://doly-dev.github.io/util-helpers/index.html) 是一个基于业务场景的工具方法库。

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

*强烈不推荐使用已构建文件，这样无法按需加载。*

**示例**

```javascript
import { validator } from 'util-helpers'

validator.isMobile("13000000000") // => true
```

**按需引入**

该方式只加载用到的方法。

```javascript
import validator from 'util-helpers/lib/validator'
```

## 文档

- [processor](https://doly-dev.github.io/util-helpers/module-processor.html) - 数据处理
    - [formatDate](https://doly-dev.github.io/util-helpers/module-processor_formatDate.html) - 日期时间格式化
    - [formatMoney](https://doly-dev.github.io/util-helpers/module-processor_formatMoney.html) - 金额格式化
    - [formatBankCard](https://doly-dev.github.io/util-helpers/module-processor_formatBankCard.html) - 银行卡格式化
    - [replaceChar](https://doly-dev.github.io/util-helpers/module-processor_replaceChar.html) - 替换字符，应用场景如：脱敏
- [validator](https://doly-dev.github.io/util-helpers/module-validator.html) - 数据验证
    - [isMobile](https://doly-dev.github.io/util-helpers/module-validator_isMobile.html) - 手机号码
    - [isTelephone](https://doly-dev.github.io/util-helpers/module-validator_isTelephone.html) - 固定电话
    - [isPostcode](https://doly-dev.github.io/util-helpers/module-validator_isPostcode.html) - 邮政编码
    - [isIdCard](https://doly-dev.github.io/util-helpers/module-validator_isIdCard.html) - 身份证号
    - [isEmail](https://doly-dev.github.io/util-helpers/module-validator_isEmail.html) - 邮箱
    - [isQQ](https://doly-dev.github.io/util-helpers/module-validator_isQQ.html) - QQ号
    - [isWX](https://doly-dev.github.io/util-helpers/module-validator_isWX.html) - 微信号
    - [isVehicle](https://doly-dev.github.io/util-helpers/module-validator_isVehicle.html) - 车牌号
    - URL `待开发`
    - 银行卡 `待开发`
    - 统一社会信用代码 `待开发`
    - 密码强度 `待开发`
    - 护照 `待开发`
    - 港澳台通行证 `待开发`
    - 日期 `待开发`
    - 中文 `待开发`
    - IPv4地址 `待开发`
- [type](https://doly-dev.github.io/util-helpers/module-type.html) - 类型检测
    - [isArguments](https://doly-dev.github.io/util-helpers/module-type_isArguments.html)
    - [isArray](https://doly-dev.github.io/util-helpers/module-type_isArray.html)
    - [isBoolean](https://doly-dev.github.io/util-helpers/module-type_isBoolean.html)
    - [isDate](https://doly-dev.github.io/util-helpers/module-type_isDate.html)
    - [isError](https://doly-dev.github.io/util-helpers/module-type_isError.html)
    - [isFunction](https://doly-dev.github.io/util-helpers/module-type_isFunction.html)
    - [isNaN](https://doly-dev.github.io/util-helpers/module-type_isNaN.html)
    - [isNumber](https://doly-dev.github.io/util-helpers/module-type_isNumber.html)
    - [isNull](https://doly-dev.github.io/util-helpers/module-type_isNull.html)
    - [isObject](https://doly-dev.github.io/util-helpers/module-type_isObject.html)
    - [isRegExp](https://doly-dev.github.io/util-helpers/module-type_isRegExp.html)
    - [isString](https://doly-dev.github.io/util-helpers/module-type_isString.html)
    - [isSymbol](https://doly-dev.github.io/util-helpers/module-type_isSymbol.html)
    - [isMap](https://doly-dev.github.io/util-helpers/module-type_isMap.html)
    - [isWeakMap](https://doly-dev.github.io/util-helpers/module-type_isWeakMap.html)
    - [isSet](https://doly-dev.github.io/util-helpers/module-type_isSet.html)
    - [isWeakSet](https://doly-dev.github.io/util-helpers/module-type_isWeakSet.html)
    - [isUndefined](https://doly-dev.github.io/util-helpers/module-type_isUndefined.html)

## 精选第三方工具库

- [lodash](https://www.npmjs.com/package/lodash) - 封装了诸多对字符串、数组、对象等常见数据类型的处理函数
- [query-string](https://www.npmjs.com/package/query-string) - URL解析、序列化
- [js-cookie](https://www.npmjs.com/package/js-cookie) - 一个简单，轻量级的JavaScript API，用于处理cookie
- [number-precision](https://www.npmjs.com/package/number-precision) - 使用javascript精确地执行加法，减法，乘法和除法运算
- [moment](https://www.npmjs.com/package/moment) - 一个轻量级JavaScript日期库，用于解析，验证，操作和格式化日期。
- [dayjs](https://www.npmjs.com/package/dayjs) - 使用相同的现代API 快速2kB替代Moment.js
- [axios](https://www.npmjs.com/package/axios) - 基于Promise的HTTP客户端，用于浏览器和node.js
- [jsencrypt](https://www.npmjs.com/package/jsencrypt) - 用于执行OpenSSL RSA加密，解密和密钥生成的Javascript库。
- [crypto-js](https://www.npmjs.com/package/crypto-js) - 加密标准的JavaScript库。(AES/SHA256/MD5/SHA1...但没有RSA)



