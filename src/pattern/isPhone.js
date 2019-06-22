import check from './check'

/**
 * 检测值是否为手机号码
 * 
 * @module pattern/isPhone
 * @since 1.1.0
 * @param {String} value 手机号码
 * @returns {Boolean} 值是否为手机号码
 * @example 
 * 
 * isPhone('13000000000');
 * // => true
 *
 * isPhone('13000');
 * // => false
 * 
 */
function isPhone(value) {
    return check(value, 'phone');
}

export default isPhone;