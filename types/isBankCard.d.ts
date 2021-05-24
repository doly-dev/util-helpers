export default isBankCard;
/**
 * 检测值是否为银行卡号。正常模式（非0开头，10~21位数字）宽松模式（8~30位数字）
 *
 * @static
 * @alias module:Validator.isBankCard
 * @see 参考 {@link https://kf.qq.com/faq/170112ABnm6b170112FvquAn.html|常用银行账号位数参考}
 * @since 1.1.0
 * @param {string} value 要检测的值
 * @param {Object} [options] 配置项
 * @param {boolean} [options.loose=false] 宽松模式，默认 false
 * @returns {boolean} 值是否为银行卡号
 * @example
 *
 * isBankCard('6228480402564890018');
 * // => true
 *
 * isBankCard('6228480402564890');
 * // => true
 *
 * isBankCard('123456789');
 * // => false
 *
 * isBankCard('123456789', { loose: true });
 * // => true
 *
 */
declare function isBankCard(value: string, { loose }?: {
    loose?: boolean | undefined;
} | undefined): boolean;
