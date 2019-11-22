import isType from './isType';

/**
 * 检查值是否为Boolean
 * 
 * @static
 * @alias module:Type.isBoolean
 * @since 1.1.0
 * @param {*} value 检查值
 * @returns {Boolean} 是否为Boolean
 * @example
 *
 * isBoolean(false)
 * // => true
 *
 * isBoolean(null)
 * // => false
 */
function isBoolean(value) {
    return value === true || value === false || isType(value, 'Boolean');
}

export default isBoolean