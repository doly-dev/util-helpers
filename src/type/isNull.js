import isType from './isType';

/**
 * 检查值是否为Null
 * 
 * @module type/isNull
 * @since 1.1.0
 * @param {*} value 检查值
 * @returns {Null} 是否为Null
 * @example
 *
 * isNull(null)
 * // => true
 *
 * isNull(void 0)
 * // => false
 */
function isNull(value) {
    return value === null;
}

export default isNull