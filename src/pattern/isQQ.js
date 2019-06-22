import check from './check'

/**
 * 检测值是否为QQ号
 * 
 * @module pattern/isQQ
 * @since 1.1.0
 * @param {String} value QQ号
 * @returns {Boolean} 值是否为QQ号
 * @example
 * 
 * isQQ('12345');
 * // => true
 *
 * isQQ(12345);
 * // => true
 * 
 */
function isQQ(value) {
    return check(value, 'qq');
}

export default isQQ;