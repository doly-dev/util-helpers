import check from './utils/check'

/**
 * 检测值是否为微信号
 * 
 * @static
 * @alias module:Validator.isWX
 * @since 1.1.0
 * @param {String} value 要检测的值
 * @returns {Boolean} 值是否为微信号
 * @example
 * 
 * isWX('a12345');
 * // => true
 *
 * isWX('123');
 * // => false
 * 
 */
function isWX(value) {
    return check(value, 'wx');
}

export default isWX;