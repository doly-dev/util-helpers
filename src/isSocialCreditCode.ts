import isUnifiedIdentifier from './isUnifiedIdentifier';

/**
 * 检测值是否为统一社会信用代码，也叫三证合一组织代码。由18位数字和大写字母组成，不使用I、O、Z、S、V。
 *
 * @private
 * @alias module:Validator.isSocialCreditCode
 * @since 1.1.0
 * @see {@link https://zh.wikisource.org/zh-hans/GB_32100-2015_法人和其他组织统一社会信用代码编码规则 GB 32100-2015 法人和其他组织统一社会信用代码编码规则}
 * @deprecated 即将废弃，请使用 `isUnifiedIdentifier` 替代。
 * @param {*} value 要检测的值
 * @param {Object} [options] 配置项
 * @param {boolean} [options.checkCode=true] 是否校验最后一位校验码，如果为false，不校验校验位。
 * @returns {boolean} 值是否为统一社会信用代码
 * @example
 *
 * isSocialCreditCode('91350100M000100Y43'); // true
 * isSocialCreditCode('91350100M000100Y4A'); // false
 *
 * // 不校验校验位，长度和类型还是有校验的
 * isSocialCreditCode('91350100M000100Y4A', { checkCode: false }); // true
 * isSocialCreditCode('91350100M000100YIO', { checkCode: false }); // false
 * isSocialCreditCode('91350100M000100Y', { checkCode: false }); // false
 *
 */
const isSocialCreditCode = isUnifiedIdentifier;

export default isSocialCreditCode;
