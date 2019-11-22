import check from './utils/check'

/**
 * 检测值是否为QQ号
 * 
 * @static
 * @alias module:Validator.isQQ
 * @since 1.1.0
 * @param {String} value 要检测的值
 * @returns {Boolean} 值是否为QQ号
 * @example
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