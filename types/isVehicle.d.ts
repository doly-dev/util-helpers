export default isVehicle;
/**
 * 检测值是否为车牌号，支持新能源和非新能源车牌
 *
 * @static
 * @alias module:Validator.isVehicle
 * @see 参考 {@link https://baike.baidu.com/item/%E8%BD%A6%E7%89%8C%E5%8F%B7/1170490|车牌号}
 * @since 1.1.0
 * @param {string} value 要检测的值
 * @returns {boolean} 值是否为车牌号
 * @example
 *
 * isVehicle('京L12345');
 * // => true
 *
 * isVehicle('粤BD12345');
 * // => true
 *
 * isVehicle('粤BF12345');
 * // => true
 *
 * isVehicle('粤B12345D');
 * // => true
 *
 * isVehicle('粤B12345F');
 * // => true
 *
 */
declare function isVehicle(value: string): boolean;
