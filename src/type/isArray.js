import isType from './isType';

/**
 * 检查值是否为Array
 * 
 * @module type/isArray
 * @since 1.1.0
 * @param {*} value 检查值
 * @returns {Boolean} 是否为Array
 * @example
 *
 * isArray([])
 * // => true
 *
 * isArray(1)
 * // => false
 */
function isArray(value) {
    return Array.isArray(value) || isType(value, 'Array');
}

export default isArray