import check from './check'

/**
 * 检测值是否为手机号码
 * 
 * @alias module:validator.isMobile
 * @since 1.1.0
 * @param {String} value 要检测的值
 * @returns {Boolean} 值是否为手机号码
 * @example 
 * 
 * import { isMobile } from "util-helpers";
 * 
 * isMobile('13000000000');
 * // => true
 *
 * isMobile('13000');
 * // => false
 * 
 */
function isMobile(value) {
    return check(value, 'mobile');
}

export default isMobile;