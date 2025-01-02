import { toString } from 'ut2';

// 标准格式如下：
// [协议类型]://[服务器地址]:[端口号]/[资源层级UNIX文件路径][文件名]?[查询]#[片段ID]

// 完整格式如下：
// [协议类型]://[访问资源需要的凭证信息]@[服务器地址]:[端口号]/[资源层级UNIX文件路径][文件名]?[查询]#[片段ID]
//
// 其中[访问凭证信息]、[端口号]、[查询]、[片段ID]都属于选填项。

const protocalReg = '[\\w-.]+:\\/\\/';
const credentialsReg = '[-;:&=\\+\\$,\\w]+@';
const serverReg = 'localhost|(([^\\s:\\/]+?\\.)+?[^\\s:\\/]+)';
const portReg = ':\\d+';
const pathReg = '\\/.*';
const searchReg = '\\?.*';
const hashReg = '#.*';

const regWithProtocal = new RegExp(`^${protocalReg}(?:${credentialsReg})?(?:${serverReg})(?:${portReg})?(?:${pathReg})*(?:${searchReg})?(?:${hashReg})?$`);
const regNonProtocal = new RegExp(`^(?:${serverReg})(?:${portReg})?(?:${pathReg})*(?:${searchReg})?(?:${hashReg})?$`);

/**
 * 检测值是否为url
 *
 * @alias module:Validator.isUrl
 * @since 3.4.0
 * @see {@link https://zh.wikipedia.org/wiki/统一资源定位符 统一资源定位符}
 * @param {*} value 要检测的值
 * @returns {boolean} 值是否为url
 * @example
 *
 * isUrl(''); // false
 * isUrl('/foo/bar'); // false
 *
 * isUrl('8.8.8.8'); // true
 * isUrl('example.com'); // true
 * isUrl('http://example.com'); // true
 * isUrl('https://example.com:8080'); // true
 * isUrl('https://www.example.com/test/123'); // true
 * isUrl('https://www.example.com/test/123?foo=bar'); // true
 * isUrl('https://www.example.com/test/123?foo=中文#id'); // true
 * isUrl('https://www.example.com/test/123?foo=中文#测试'); // true
 * isUrl('ftp://127.0.0.1:8080/测试.tar'); // true
 * isUrl('a.b'); // true
 * isUrl('a.b:8080'); // true
 * isUrl('p://a.b'); // true
 * isUrl('p://a.b:8888'); // true
 * isUrl('中文域名.中文后缀'); // true
 * isUrl('中文域名.cn'); // true
 *
 */
function isUrl(value: any) {
  const valueStr = toString(value);
  return regWithProtocal.test(valueStr) || regNonProtocal.test(valueStr);
}

export default isUrl;
