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

如果你使用 `babel`，可使用以下方式进行按需加载。

方式一：指定模块文件

```javascript
import validator from 'util-helpers/lib/validator'
import isMobile from 'util-helpers/lib/validator/isMobile'
```

方式二：使用 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) ，在 `babel` 的 `plugin` 中添加以下配置

```javascript
['import', { 
  libraryName: 'util-helpers', 
  camel2DashComponentName: false,
  customName: require('path').join(__dirname, './node_modules/util-helpers/module-config.js')
}, 'util-helpers']
```

然后跟示例一样写法

```javascript
import { isMobile, formatMoney } from 'util-helpers'

isMobile("13000000000") // => true
formatMoney('1000') // => 1,000.00
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
    - [isBankCard](https://doly-dev.github.io/util-helpers/module-validator_isBankCard.html) - 银行卡
    - [isSocialCreditCode](https://doly-dev.github.io/util-helpers/module-validator_isSocialCreditCode.html) - 统一社会信用代码
    - [isPassword](https://doly-dev.github.io/util-helpers/module-validator_isPassword.html) 密码强度
    - [isPassport](https://doly-dev.github.io/util-helpers/module-validator_isPassport.html) - 护照号
    - [isChinese](https://doly-dev.github.io/util-helpers/module-validator_isChinese.html) - 中文
    - [isIPv4](https://doly-dev.github.io/util-helpers/module-validator_isIPv4.html) - IPv4

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



