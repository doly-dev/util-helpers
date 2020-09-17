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

## 示例

```javascript
import { formatBankCard, formatMoney } from 'util-helpers'

formatBankCard('6228480402564890018'); // => 6228 4804 0256 4890 018
formatBankCard('6228480402564890018', {char: '-'}); // => 6228-4804-0256-4890-018

formatMoney('1000'); // => 1,000.00
```

## 文档

> 数学计算，修正了浮点数计算问题，适用于金额计算。 
> 参考：[JS浮点数计算测试](https://2zbuy.csb.app/)

- 数学计算
  - [plus](https://doly-dev.github.io/util-helpers/module-Math.html#.plus) - 加
  - [minus](https://doly-dev.github.io/util-helpers/module-Math.html#.minus) - 减
  - [times](https://doly-dev.github.io/util-helpers/module-Math.html#.times) - 乘
  - [divide](https://doly-dev.github.io/util-helpers/module-Math.html#.divide) - 除
  - [round](https://doly-dev.github.io/util-helpers/module-Math.html#.round) - 四舍五入
- 数据处理
  - [formatMoney](https://doly-dev.github.io/util-helpers/module-Processor.html#.formatMoney) - 金额格式化
  - [formatBankCard](https://doly-dev.github.io/util-helpers/module-Processor.html#.formatBankCard) - 银行卡格式化
  - [replaceChar](https://doly-dev.github.io/util-helpers/module-Processor.html#.replaceChar) - 替换字符，应用场景如：脱敏
  - [numberToChinese](https://doly-dev.github.io/util-helpers/module-Processor.html#.numberToChinese) - 数字转中文数字
- 数据验证
  - [isMobile](https://doly-dev.github.io/util-helpers/module-Validator.html#.isMobile) - 手机号码
  - [isTelephone](https://doly-dev.github.io/util-helpers/module-Validator.html#.isTelephone) - 固定电话
  - [isPostcode](https://doly-dev.github.io/util-helpers/module-Validator.html#.isPostcode) - 邮政编码
  - [isIdCard](https://doly-dev.github.io/util-helpers/module-Validator.html#.isIdCard) - 身份证号
  - [isEmail](https://doly-dev.github.io/util-helpers/module-Validator.html#.isEmail) - 邮箱
  - [isQQ](https://doly-dev.github.io/util-helpers/module-Validator.html#.isQQ) - QQ号
  - [isWX](https://doly-dev.github.io/util-helpers/module-Validator.html#.isWX) - 微信号
  - [isVehicle](https://doly-dev.github.io/util-helpers/module-Validator.html#.isVehicle) - 车牌号
  - [isBankCard](https://doly-dev.github.io/util-helpers/module-Validator.html#.isBankCard) - 银行卡
  - [isSocialCreditCode](https://doly-dev.github.io/util-helpers/module-Validator.html#.isSocialCreditCode) - 统一社会信用代码，也叫三证合一组织代码
  - [isPassword](https://doly-dev.github.io/util-helpers/module-Validator.html#.isPassword) 密码强度
  - [isPassport](https://doly-dev.github.io/util-helpers/module-Validator.html#.isPassport) - 护照号
  - [isChinese](https://doly-dev.github.io/util-helpers/module-Validator.html#.isChinese) - 中文
  - [isIPv4](https://doly-dev.github.io/util-helpers/module-Validator.html#.isIPv4) - IPv4
  - [isIPv6](https://doly-dev.github.io/util-helpers/module-Validator.html#.isIPv6) - IPv6
  - [isUrl](https://doly-dev.github.io/util-helpers/module-Validator.html#.isUrl) - URL
  - [isBusinessLicense](https://doly-dev.github.io/util-helpers/module-Validator.html#.isBusinessLicense) - 营业执照，也叫工商注册号

## 精选第三方工具库

- [lodash](https://www.npmjs.com/package/lodash) - 封装了诸多对字符串、数组、对象等常见数据类型的处理函数
- [query-string](https://www.npmjs.com/package/query-string) - URL解析、序列化
- [qs](https://www.npmjs.com/package/qs) - URL查询字符串解析和序列化库
- [js-cookie](https://www.npmjs.com/package/js-cookie) - 一个简单，轻量级的JavaScript API，用于处理cookie
- [number-precision](https://www.npmjs.com/package/number-precision) - 使用javascript精确地执行加法，减法，乘法和除法运算
- [moment](https://www.npmjs.com/package/moment) - 一个轻量级JavaScript日期库，用于解析，验证，操作和格式化日期
- [dayjs](https://www.npmjs.com/package/dayjs) - 一个轻量的处理时间和日期的 JavaScript 库，和 Moment.js 的 API 设计保持完全一样
- [axios](https://www.npmjs.com/package/axios) - 基于Promise的HTTP客户端，用于浏览器和node.js
- [jsencrypt](https://www.npmjs.com/package/jsencrypt) - 用于执行OpenSSL RSA加密，解密和密钥生成的Javascript库
- [crypto-js](https://www.npmjs.com/package/crypto-js) - 加密标准的JavaScript库
- [tinycolor2](https://www.npmjs.com/package/tinycolor2) - JavaScript颜色工具，用于JavaScript中的颜色处理和转换
- [store2](https://www.npmjs.com/package/store2) - 丰富了localStorage和sessionStorage功能（JSON，命名空间，扩展等）
