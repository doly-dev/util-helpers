import check from './check'

/**
 * 检测值是否为ipv4
 * 
 * @alias module:validator.isIPv4
 * @since 1.1.0
 * @param {String} value 要检测的值
 * @returns {Boolean} 值是否为ipv4
 * @example
 * 
 * import { isIPv4 } from "util-helpers";
 * 
 * isIPv4('192.168.1.1');
 * // => true
 *
 * isIPv4('255.255.255.255');
 * // => true
 *
 * isIPv4('256.256.256.256');
 * // => false
 *
 * isIPv4('0.0');
 * // => false
 * 
 */
function isIPv4(value) {
    return check(value, 'ipv4');
}

export default isIPv4;