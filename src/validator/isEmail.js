import check from './check'

/**
 * 检测值是否为Email
 * 
 * @alias module:validator.isEmail
 * @since 1.1.0
 * @param {String} value 要检测的值
 * @returns {Boolean} 值是否为Email
 * @example 
 * 
 * import { isEmail } from "util-helpers";
 * 
 * isEmail('1232@qq.com');
 * // => true
 *
 * isEmail('123@');
 * // => false
 * 
 */
function isEmail(value) {
    return check(value, 'email');
}

export default isEmail;