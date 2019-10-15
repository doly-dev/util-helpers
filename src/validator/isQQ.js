import check from './check'

/**
 * 检测值是否为QQ号
 * 
 * @alias module:validator.isQQ
 * @since 1.1.0
 * @param {String} value 要检测的值
 * @returns {Boolean} 值是否为QQ号
 * @example
 * 
 * import { isQQ } from "util-helpers";
 * 
 * isQQ('12345');
 * // => true
 *
 * isQQ('123');
 * // => false
 * 
 */
function isQQ(value) {
    return check(value, 'qq');
}

export default isQQ;