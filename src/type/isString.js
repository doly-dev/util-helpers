import isType from './isType';

/**
 * 检查值是否为String
 * 
 * @module type/isString
 * @since 1.1.0
 * @param {*} value 检查值
 * @returns {Boolean} 是否为String
 * @example
 *
 * isString('abc')
 * // => true
 *
 * isString(1)
 * // => false
 */
function isString(value) {
    return isType(value, 'String');
}

export default isString