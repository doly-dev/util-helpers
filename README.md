# util-helpers

一个基于业务场景的工具方法库。[点击查看在线文档](https://doly-dev.github.io/util-helpers/index.html)。

[![npm][npm]][npm-url] [![Build and Deploy Docs](https://github.com/doly-dev/util-helpers/actions/workflows/ci.yml/badge.svg)](https://github.com/doly-dev/util-helpers/actions/workflows/ci.yml) [![codecov](https://codecov.io/gh/doly-dev/util-helpers/branch/master/graph/badge.svg?token=nhm6Zrmmyq)](https://codecov.io/gh/doly-dev/util-helpers) ![npm](https://img.shields.io/npm/dt/util-helpers) ![GitHub](https://img.shields.io/github/license/doly-dev/util-helpers.svg)

## 使用

### `es` 或 `node` 开发环境

安装依赖

```shell
npm install util-helpers
```

```shell
yarn add util-helpers
```

```shell
pnpm add util-helpers
```

### 浏览器引入

如果你的项目使用的是原生方式开发，可以在浏览器中使用 `script` 标签直接引入文件，并使用全局变量 `utilHelpers` 。

`npm` 包的 [util-helpers/dist](https://www.npmjs.com/package/util-helpers?activeTab=code) 目录下提供了 `UMD` 包 `util-helpers.js` 以及 `util-helpers.min.js`。你也可以通过 [UNPKG](https://unpkg.com/browse/util-helpers/dist/) 下载到本地进行使用。或者直接使用 [UNPKG 线上版本](https://unpkg.com/util-helpers/dist/util-helpers.min.js)<sup> _注意版本_ </sup>。

## 示例

```javascript
import { formatMoney, formatBankCard } from 'util-helpers';

formatMoney('1000'); // 1,000.00

formatBankCard('6228480402564890018'); // 6228 4804 0256 4890 018
formatBankCard('6228480402564890018', { spaceMark: '-' }); // 6228-4804-0256-4890-018
```

## 文档

> 数学计算，修正了浮点数计算问题，适用于金额计算。参考：[JS 浮点数计算测试](https://2zbuy.csb.app/)

- 数学计算
  - [divide](https://doly-dev.github.io/util-helpers/module-Math.html#.divide) - 除
  - [gcd](https://doly-dev.github.io/util-helpers/module-Math.html#.gcd) - 最大公约数
  - [lcm](https://doly-dev.github.io/util-helpers/module-Math.html#.lcm) - 最小公倍数
  - [minus](https://doly-dev.github.io/util-helpers/module-Math.html#.minus) - 减
  - [plus](https://doly-dev.github.io/util-helpers/module-Math.html#.plus) - 加
  - [round](https://doly-dev.github.io/util-helpers/module-Math.html#.round) - 四舍五入
  - [times](https://doly-dev.github.io/util-helpers/module-Math.html#.times) - 乘
- 浏览器
  - [ajax](https://doly-dev.github.io/util-helpers/module-Browser.html#.ajax) - 请求
  - [checkFileType](https://doly-dev.github.io/util-helpers/module-Browser.html#.checkFileType) - 检查文件类型
  - [compressImage](https://doly-dev.github.io/util-helpers/module-Browser.html#.compressImage) - 压缩图片
  - [dataURLToBlob](https://doly-dev.github.io/util-helpers/module-Browser.html#.dataURLToBlob) - 将 DataURL 转为 Blob 对象
  - [download](https://doly-dev.github.io/util-helpers/module-Browser.html#.download) - 下载
  - [fileReader](https://doly-dev.github.io/util-helpers/module-Browser.html#.fileReader) - 读取 Blob 或 File 对象，转为 Base64/String/ArrayBuffer
  - [getFileBlob](https://doly-dev.github.io/util-helpers/module-Browser.html#.getFileBlob) - 获取文件 Blob
  - [getFileType](https://doly-dev.github.io/util-helpers/module-Browser.html#.getFileType) - 获取文件类型
  - [getImageInfo](https://doly-dev.github.io/util-helpers/module-Browser.html#.getImageInfo) - 获取图片信息
  - [getMimeType](https://doly-dev.github.io/util-helpers/module-Browser.html#.getMimeType) - 获取文件 MIME 类型
  - [injectStyle](https://doly-dev.github.io/util-helpers/module-Browser.html#.injectStyle) - 注入样式
  - [loadImage](https://doly-dev.github.io/util-helpers/module-Browser.html#.loadImage) - 加载图片
  - [loadImageWithBlob](https://doly-dev.github.io/util-helpers/module-Browser.html#.loadImageWithBlob) - 加载图片和 blob 对象
  - [loadScript](https://doly-dev.github.io/util-helpers/module-Browser.html#.loadScript) - 加载 js 文件
- 数据处理
  - [bytesToSize](https://doly-dev.github.io/util-helpers/module-Processor.html#.bytesToSize) - 字节转换为存储单位
  - [formatBankCard](https://doly-dev.github.io/util-helpers/module-Processor.html#.formatBankCard) - 格式化银行卡
  - [formatMobile](https://doly-dev.github.io/util-helpers/module-Processor.html#.formatMobile) - 格式化手机号码
  - [formatMoney](https://doly-dev.github.io/util-helpers/module-Processor.html#.formatMoney) - 格式化金额
  - [numberToChinese](https://doly-dev.github.io/util-helpers/module-Processor.html#.numberToChinese) - 数字转中文数字
  - [padZero](https://doly-dev.github.io/util-helpers/module-Processor.html#.padZero) - 前置补零
  - [parseIdCard](https://doly-dev.github.io/util-helpers/module-Processor.html#.parseIdCard) - 解析身份证号码
  - [replaceChar](https://doly-dev.github.io/util-helpers/module-Processor.html#.replaceChar) - 替换字符，应用场景如：脱敏
  - [safeDate](https://doly-dev.github.io/util-helpers/module-Processor.html#.safeDate) - 创建一个 Date 实例，同 new Date
  - [setDataURLPrefix](https://doly-dev.github.io/util-helpers/module-Processor.html#.setDataURLPrefix) - 设置 DataURL 前缀、MIME 类型、base64 标识
  - [transformObjectValue](https://doly-dev.github.io/util-helpers/module-Processor.html#.transformObjectValue) - 创建一个转换值的新对象或数组
- 树结构数据操作
  - [filterTree](https://doly-dev.github.io/util-helpers/module-Processor.html#.filterTree) - 过滤树节点
  - [findTreeNode](https://doly-dev.github.io/util-helpers/module-Other.html#.findTreeNode) - 查找树结构数据节点
  - [findTreeNodes](https://doly-dev.github.io/util-helpers/module-Other.html#.findTreeNodes) - 查找树结构数据多个节点
  - [findTreeSelect](https://doly-dev.github.io/util-helpers/module-Other.html#.findTreeSelect) - 查找包含当前节点的所有父级节点
  - [listToTree](https://doly-dev.github.io/util-helpers/module-Processor.html#.listToTree) - 列表数据转树结构
  - [transformFieldNames](https://doly-dev.github.io/util-helpers/module-Processor.html#.transformFieldNames) - 转换字段名
  - [treeToList](https://doly-dev.github.io/util-helpers/module-Processor.html#.treeToList) - 树结构转列表数据
- 数据验证
  - [isBankCard](https://doly-dev.github.io/util-helpers/module-Validator.html#.isBankCard) - 银行卡
  - [isChinese](https://doly-dev.github.io/util-helpers/module-Validator.html#.isChinese) - 中文
  - [isEmail](https://doly-dev.github.io/util-helpers/module-Validator.html#.isEmail) - 邮箱
  - [isHMCard](https://doly-dev.github.io/util-helpers/module-Validator.html#.isHMCard) - 港澳居民来往内地通行证，俗称回乡证或回乡卡
  - [isIPv4](https://doly-dev.github.io/util-helpers/module-Validator.html#.isIPv4) - IPv4
  - [isIPv6](https://doly-dev.github.io/util-helpers/module-Validator.html#.isIPv6) - IPv6
  - [isIdCard](https://doly-dev.github.io/util-helpers/module-Validator.html#.isIdCard) - 身份证号
  - [isMobile](https://doly-dev.github.io/util-helpers/module-Validator.html#.isMobile) - 手机号码
  - [isPassport](https://doly-dev.github.io/util-helpers/module-Validator.html#.isPassport) - 护照号
  - [isPassword](https://doly-dev.github.io/util-helpers/module-Validator.html#.isPassword) 密码强度
  - [isPostcode](https://doly-dev.github.io/util-helpers/module-Validator.html#.isPostcode) - 邮政编码
  - [isQQ](https://doly-dev.github.io/util-helpers/module-Validator.html#.isQQ) - QQ 号
  - [isSwiftCode](https://doly-dev.github.io/util-helpers/module-Validator.html#.isSwiftCode) - Swift Code
  - [isTWCard](https://doly-dev.github.io/util-helpers/module-Validator.html#.isTWCard) - 台湾居民来往大陆通行证，俗称台胞证
  - [isTelephone](https://doly-dev.github.io/util-helpers/module-Validator.html#.isTelephone) - 固定电话
  - [isUnifiedIdentifier](https://doly-dev.github.io/util-helpers/module-Validator.html#.isUnifiedIdentifier) - 统一社会信用代码，也叫三证合一组织代码
  - [isUrl](https://doly-dev.github.io/util-helpers/module-Validator.html#.isUrl) - URL
  - [isValidNumber](https://doly-dev.github.io/util-helpers/module-Validator.html#.isValidNumber) - 有效数字
  - [isVehicle](https://doly-dev.github.io/util-helpers/module-Validator.html#.isVehicle) - 车牌号
  - [isWX](https://doly-dev.github.io/util-helpers/module-Validator.html#.isWX) - 微信号
  - [validatePassword](https://doly-dev.github.io/util-helpers/module-Validator.html#.validatePassword) - 验证密码
- 其他
  - [calculateCursorPosition](https://doly-dev.github.io/util-helpers/module-Other.html#.calculateCursorPosition) - 计算光标位置
  - [checkResult](https://doly-dev.github.io/util-helpers/module-Other.html#.checkResult) - 检查函数执行结果
  - [getExtname](https://doly-dev.github.io/util-helpers/module-Processor.html#.getExtname) - 获取路径扩展名
  - [randomString](https://doly-dev.github.io/util-helpers/module-Other.html#.randomString) - 随机字符串
  - [strlen](https://doly-dev.github.io/util-helpers/module-Other.html#.strlen) - 字符长度
- Classes
  - [AsyncMemo](https://doly-dev.github.io/util-helpers/AsyncMemo.html) - 异步缓存类

## 精选第三方工具库

- [ut2] - 一个现代 JavaScript 实用工具库
- [lodash] - 封装了诸多对字符串、数组、对象等常见数据类型的处理函数
- [query-string] - URL 解析、序列化
- [qs] - URL 查询字符串解析和序列化库
- [js-cookie] - 一个简单，轻量级的 JavaScript API，用于处理 cookie
- [cache2] - 一个简单的 JavaScript 缓存管理，支持浏览器端和 node.js
- [store2] - 丰富了 localStorage 和 sessionStorage 功能（JSON，命名空间，扩展等）
- [dayjs] - 一个轻量的处理时间和日期的 JavaScript 库，和 Moment.js 的 API 设计保持完全一样
- [date-fns] - 提供了最全面、简单且一致的工具集，用于在浏览器和 Node.js 中操作 JavaScript 日期
- [moment] - 一个轻量级 JavaScript 日期库，用于解析，验证，操作和格式化日期
- [ms] - 将各种时间格式转换为毫秒
- [axios] - 基于 Promise 的 HTTP 客户端，用于浏览器和 node.js
- [jsencrypt] - 用于执行 OpenSSL RSA 加密，解密和密钥生成的 Javascript 库
- [crypto-js] - 加密标准的 JavaScript 库
- [tinycolor2] - JavaScript 颜色工具，用于 JavaScript 中的颜色处理和转换
- [uuid] - 生成通用唯一识别码（Universally Unique Identifier）
- [JSZip] - 创建、读取和编辑 zip 文件
- [ua-parser-js] - 用于从用户代理数据中检测浏览器、引擎、操作系统、CPU 和设备类型/型号
<!-- - [semver](https://www.npmjs.com/package/semver) - npm 语义版本控制。 -->

[ut2]: https://www.npmjs.com/package/ut2
[lodash]: https://www.npmjs.com/package/lodash
[query-string]: https://www.npmjs.com/package/query-string
[qs]: https://www.npmjs.com/package/qs
[js-cookie]: https://www.npmjs.com/package/js-cookie
[cache2]: https://www.npmjs.com/package/cache2
[moment]: https://www.npmjs.com/package/moment
[dayjs]: https://www.npmjs.com/package/dayjs
[date-fns]: https://www.npmjs.com/package/date-fns
[ms]: https://www.npmjs.com/package/ms
[axios]: https://www.npmjs.com/package/axios
[jsencrypt]: https://www.npmjs.com/package/jsencrypt
[crypto-js]: https://www.npmjs.com/package/crypto-js
[tinycolor2]: https://www.npmjs.com/package/tinycolor2
[store2]: https://www.npmjs.com/package/store2
[uuid]: https://www.npmjs.com/package/uuid
[jszip]: https://www.npmjs.com/package/jszip
[npm]: https://img.shields.io/npm/v/util-helpers.svg
[npm-url]: https://npmjs.com/package/util-helpers
[ua-parser-js]: https://www.npmjs.com/package/ua-parser-js

<!--
[data-urls]: https://www.npmjs.com/package/data-urls
[what is commitlint]: https://github.com/conventional-changelog/commitlint#what-is-commitlint
[numeral]: http://numeraljs.com/
[rxjs]: https://www.npmjs.com/package/rxjs
[immutable]: https://www.npmjs.com/package/immutable
[classnames]: https://www.npmjs.com/package/classnames
[ramda]: https://www.npmjs.com/package/ramda
-->
