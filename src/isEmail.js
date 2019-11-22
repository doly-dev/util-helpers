import check from './utils/check'

/**
 * 检测值是否为Email
 * 
 * @static
 * @alias module:Validator.isEmail
 * @since 1.1.0
 * @param {String} value 要检测的值
 * @returns {Boolean} 值是否为Email
 * @example 
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