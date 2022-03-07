# util-helpers

[![npm][npm]][npm-url] ![GitHub](https://img.shields.io/github/license/doly-dev/util-helpers.svg) [![Build Status](https://travis-ci.org/doly-dev/util-helpers.svg?branch=master)](https://travis-ci.org/doly-dev/util-helpers)

[util-helpers](https://doly-dev.github.io/util-helpers/index.html) 是一个基于业务场景的工具方法库。

## 使用

**`npm` 或 `yarn` 安装**

```shell
npm install util-helpers
```

```shell
yarn add util-helpers
```

**浏览器引入**

在浏览器中使用 `script` 标签直接引入文件，并使用全局变量 `utilHelpers` 。

`npm` 包的 `util-helpers/dist` 目录下提供了 `util-helpers.js` 以及 `util-helpers.min.js`。你也可以通过 [UNPKG](https://unpkg.com/util-helpers@latest/dist/) 下载到本地进行使用。或者直接使用 [UNPKG 线上版本](https://unpkg.com/util-helpers@latest/dist/util-helpers.min.js)<sup> _注意版本_ </sup>。

```html
<script src="https://unpkg.com/util-helpers@latest/dist/util-helpers.min.js"></script>
```

## 示例

```javascript
import { formatBankCard, formatMoney } from 'util-helpers';

formatBankCard('6228480402564890018'); // => 6228 4804 0256 4890 018
formatBankCard('6228480402564890018', { char: '-' }); // => 6228-4804-0256-4890-018

formatMoney('1000'); // => 1,000.00
```

## 文档

> 数学计算，修正了浮点数计算问题，适用于金额计算。参考：[JS 浮点数计算测试](https://2zbuy.csb.app/)

- 数学计算
  - [plus](https://doly-dev.github.io/util-helpers/module-Math.html#.plus) - 加
  - [minus](https://doly-dev.github.io/util-helpers/module-Math.html#.minus) - 减
  - [times](https://doly-dev.github.io/util-helpers/module-Math.html#.times) - 乘
  - [divide](https://doly-dev.github.io/util-helpers/module-Math.html#.divide) - 除
  - [round](https://doly-dev.github.io/util-helpers/module-Math.html#.round) - 四舍五入
- 数据处理
  - [blobToDataURL](https://doly-dev.github.io/util-helpers/module-Processor.html#.blobToDataURL) - 将 Blob 或 File 对象转成 data:URL 格式的 Base64 字符串
  - [bytesToSize](https://doly-dev.github.io/util-helpers/module-Processor.html#.bytesToSize) - 字节转换为存储单位
  - [dataURLToBlob](https://doly-dev.github.io/util-helpers/module-Processor.html#.dataURLToBlob) - 将 DataURL 转为 Blob 对象
  - [formatMoney](https://doly-dev.github.io/util-helpers/module-Processor.html#.formatMoney) - 金额格式化
  - [formatBankCard](https://doly-dev.github.io/util-helpers/module-Processor.html#.formatBankCard) - 银行卡格式化
  - [normalizeString](https://doly-dev.github.io/util-helpers/module-Processor.html#.normalizeString) - 规整化字符串，如果值为 `undefined` `null` 转为 ''，如果不是字符串类型则转为字符串
  - [numberToChinese](https://doly-dev.github.io/util-helpers/module-Processor.html#.numberToChinese) - 数字转中文数字
  - [parseIdCard](https://doly-dev.github.io/util-helpers/module-Processor.html#.parseIdCard) - 解析身份证号码
  - [replaceChar](https://doly-dev.github.io/util-helpers/module-Processor.html#.replaceChar) - 替换字符，应用场景如：脱敏
  - [setDataURLPrefix](https://doly-dev.github.io/util-helpers/module-Processor.html#.setDataURLPrefix) - 设置 DataURL 前缀、MIME 类型、base64 标识
- 数据验证
  - [isMobile](https://doly-dev.github.io/util-helpers/module-Validator.html#.isMobile) - 手机号码
  - [isTelephone](https://doly-dev.github.io/util-helpers/module-Validator.html#.isTelephone) - 固定电话
  - [isPostcode](https://doly-dev.github.io/util-helpers/module-Validator.html#.isPostcode) - 邮政编码
  - [isHMCard](https://doly-dev.github.io/util-helpers/module-Validator.html#.isHMCard) - 港澳居民来往内地通行证，俗称回乡证或回乡卡
  - [isTWCard](https://doly-dev.github.io/util-helpers/module-Validator.html#.isTWCard) - 台湾居民来往大陆通行证，俗称台胞证
  - [isIdCard](https://doly-dev.github.io/util-helpers/module-Validator.html#.isIdCard) - 身份证号
  - [isEmail](https://doly-dev.github.io/util-helpers/module-Validator.html#.isEmail) - 邮箱
  - [isQQ](https://doly-dev.github.io/util-helpers/module-Validator.html#.isQQ) - QQ 号
  - [isWX](https://doly-dev.github.io/util-helpers/module-Validator.html#.isWX) - 微信号
  - [isVehicle](https://doly-dev.github.io/util-helpers/module-Validator.html#.isVehicle) - 车牌号
  - [isBankCard](https://doly-dev.github.io/util-helpers/module-Validator.html#.isBankCard) - 银行卡
  - [isSocialCreditCode](https://doly-dev.github.io/util-helpers/module-Validator.html#.isSocialCreditCode) - 统一社会信用代码，也叫三证合一组织代码
  - [isPassword](https://doly-dev.github.io/util-helpers/module-Validator.html#.isPassword) 密码强度
  - [isPassport](https://doly-dev.github.io/util-helpers/module-Validator.html#.isPassport) - 护照号
  - [isPromiseLike](https://doly-dev.github.io/util-helpers/module-Validator.html#.isPromiseLike) - 类似 Promise 对象
  - [isChinese](https://doly-dev.github.io/util-helpers/module-Validator.html#.isChinese) - 中文
  - [isIPv4](https://doly-dev.github.io/util-helpers/module-Validator.html#.isIPv4) - IPv4
  - [isIPv6](https://doly-dev.github.io/util-helpers/module-Validator.html#.isIPv6) - IPv6
  - [isUrl](https://doly-dev.github.io/util-helpers/module-Validator.html#.isUrl) - URL
  - [isBusinessLicense](https://doly-dev.github.io/util-helpers/module-Validator.html#.isBusinessLicense) - 营业执照，也叫工商注册号
  - [validatePassword](https://doly-dev.github.io/util-helpers/module-Validator.html#.validatePassword) - 验证密码
- 其他
  - [waitTime](https://doly-dev.github.io/util-helpers/module-Other.html#.waitTime) - 等待时间返回 Promise

## 精选第三方工具库

- [lodash] - 封装了诸多对字符串、数组、对象等常见数据类型的处理函数
- [query-string] - URL 解析、序列化
- [qs] - URL 查询字符串解析和序列化库
- [js-cookie] - 一个简单，轻量级的 JavaScript API，用于处理 cookie
- [moment] - 一个轻量级 JavaScript 日期库，用于解析，验证，操作和格式化日期
- [dayjs] - 一个轻量的处理时间和日期的 JavaScript 库，和 Moment.js 的 API 设计保持完全一样
- [axios] - 基于 Promise 的 HTTP 客户端，用于浏览器和 node.js
- [jsencrypt] - 用于执行 OpenSSL RSA 加密，解密和密钥生成的 Javascript 库
- [crypto-js] - 加密标准的 JavaScript 库
- [tinycolor2] - JavaScript 颜色工具，用于 JavaScript 中的颜色处理和转换
- [store2] - 丰富了 localStorage 和 sessionStorage 功能（JSON，命名空间，扩展等）
- [uuid] - 生成通用唯一识别码（Universally Unique Identifier）
- [JSZip] - 创建、读取和编辑 zip 文件

[lodash]: https://www.npmjs.com/package/lodash
[query-string]: https://www.npmjs.com/package/query-string
[qs]: https://www.npmjs.com/package/qs
[js-cookie]: https://www.npmjs.com/package/js-cookie
[moment]: https://www.npmjs.com/package/moment
[dayjs]: https://www.npmjs.com/package/dayjs
[axios]: https://www.npmjs.com/package/axios
[jsencrypt]: https://www.npmjs.com/package/jsencrypt
[crypto-js]: https://www.npmjs.com/package/crypto-js
[tinycolor2]: https://www.npmjs.com/package/tinycolor2
[store2]: https://www.npmjs.com/package/store2
[uuid]: https://www.npmjs.com/package/uuid
[jszip]: https://www.npmjs.com/package/jszip
[data-urls]: https://www.npmjs.com/package/data-urls
[npm]: https://img.shields.io/npm/v/util-helpers.svg
[npm-url]: https://npmjs.com/package/util-helpers
[what is commitlint]: https://github.com/conventional-changelog/commitlint#what-is-commitlint
