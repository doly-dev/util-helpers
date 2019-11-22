import isType from './isType';

/**
 * 检查值是否为WeakSet
 * 
 * @static
 * @alias module:Type.isWeakSet
 * @since 1.1.0
 * @param {*} value 检查值
 * @returns {Boolean} 是否为WeakSet
 * @example
 *
 * isWeakSet(new WeakSet)
 * // => true
 *
 * isWeakSet(new Set)
 * // => false
 */
function isWeakSet(value) {
    return isType(value, 'WeakSet');
}

export default isWeakSet