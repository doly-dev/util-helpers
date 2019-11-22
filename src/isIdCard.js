import check from './utils/check'

/**
 * 检测值是否为身份证号
 * 
 * @static
 * @alias module:Validator.isIdCard
 * @since 1.1.0
 * @param {String} value 要检测的值
 * @returns {Boolean} 值是否为身份证号
 * @example
 *
 * isIdCard('320311770706001');
 * // => true
 *
 * isIdCard('130701199310302288');
 * // => true
 *
 * isIdCard('130701199310');
 * // => false
 * 
 */
function isIdCard(value) {
    return check(value, 'idCard18') || check(value, 'idCard15');
}

export default isIdCard;