import isType from './isType';

/**
 * 检查值是否为WeakMap
 * 
 * @alias module:type.isWeakMap
 * @since 1.1.0
 * @param {*} value 检查值
 * @returns {Boolean} 是否为WeakMap
 * @example
 * 
 * import { isWeakMap } from "util-helpers";
 *
 * isWeakMap(new WeakMap)
 * // => true
 *
 * isWeakMap(new Map)
 * // => false
 */
function isWeakMap(value) {
    return isType(value, 'WeakMap');
}

export default isWeakMap