import check from './check'

/**
 * 检测值是否为固定电话
 * 
 * @alias module:validator.isTelephone
 * @since 1.1.0
 * @param {String} value 要检测的值
 * @returns {Boolean} 值是否为固定电话
 * @example
 * 
 * import { isTelephone } from "util-helpers";
 *
 * isTelephone('22033212');
 * // => true
 *
 * isTelephone('021-22033212');
 * // => true
 *
 * isTelephone('021-22033212-123');
 * // => true
 *
 * isTelephone('13000000000');
 * // => false
 * 
 */
function isTelephone(value) {
    return check(value, 'telephone');
}

export default isTelephone;