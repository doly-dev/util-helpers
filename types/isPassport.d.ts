export default isPassport;
/**
 * 检测值是否为护照号
 * 支持普通护照(E*)、外交护照(DE)、公务护照(SE)、公务普通护照(PE)、香港特区护照(K/KJ)、澳门特区护照(MA)
 *
 * @static
 * @alias module:Validator.isPassport
 * @see 参考 {@link https://zh.wikipedia.org/wiki/中华人民共和国护照#个人资料页|中华人民共和国护照#个人资料页}
 * @since 1.1.0
 * @param {string} value 要检测的值
 * @returns {boolean} 值是否为护照号
 * @example
 *
 * isPassport('E12345678');
 * // => true
 *
 * isPassport('abc');
 * // => false
 *
 */
declare function isPassport(value: string): boolean;
