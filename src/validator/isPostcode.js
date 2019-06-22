import check from './check'

/**
 * 检测值是否为邮政编码
 * 
 * @module validator/isPostcode
 * @since 1.1.0
 * @param {String} value 要检测的值
 * @returns {Boolean} 值是否为邮政编码
 * @example 
 * 
 * isPostcode('101111');
 * // => true
 *
 * isPostcode('123');
 * // => false
 * 
 */
function isPostcode(value) {
    return check(value, 'postcode');
}

export default isPostcode;