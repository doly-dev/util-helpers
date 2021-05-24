export default isSocialCreditCode;
/**
 * 检测值是否为统一社会信用代码，也叫三证合一组织代码。由18位数字和大写字母组成，不使用I、O、Z、S、V。
 *
 * @static
 * @alias module:Validator.isSocialCreditCode
 * @see 参考 {@link https://zh.wikisource.org/zh-hans/GB_32100-2015_法人和其他组织统一社会信用代码编码规则|GB 32100-2015 法人和其他组织统一社会信用代码编码规则}
 * @since 1.1.0
 * @param {string} value 要检测的值
 * @param {Object} [options] 配置项
 * @param {boolean} [options.loose=false] 宽松模式。如果为true，不校验校验位。
 * @returns {boolean} 值是否为统一社会信用代码
 * @example
 *
 * isSocialCreditCode('91350100M000100Y43');
 * // => true
 *
 * isSocialCreditCode('91350100M000100Y4A');
 * // => false
 *
 * // 宽松模式，不校验校验位。所以也可以通过
 * isSocialCreditCode('91350100M000100Y4A', {loose: true});
 * // => true
 *
 */
declare function isSocialCreditCode(value: string, { loose }?: {
    loose?: boolean | undefined;
} | undefined): boolean;
