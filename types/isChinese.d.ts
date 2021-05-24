export default isChinese;
/**
 * 检测值是否为中文
 *
 * @static
 * @alias module:Validator.isChinese
 * @since 1.1.0
 * @see 参考 {@link http://www.unicode.org/reports/tr38/#BlockListing|4.4 Listing of Characters Covered by the Unihan Database}
 * @param {string} value 要检测的值
 * @param {Object} [options] 配置项
 * @param {boolean} [options.loose=false] 宽松模式。如果为true，只要包含中文即为true
 * @returns {boolean} 值是否为中文
 * @example
 *
 * isChinese('林某某');
 * // => true
 *
 * isChinese('林A');
 * // => false
 *
 * // 宽松模式，只要包含中文即为true
 * isChinese('林A', {loose: true});
 * // => true
 *
 * isChinese('A林A', {loose: true});
 * // => true
 *
 */
declare function isChinese(value: string, { loose }?: {
    loose?: boolean | undefined;
} | undefined): boolean;
