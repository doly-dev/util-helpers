import isType from './isType';

/**
 * 检查值是否为Map
 * 
 * @alias module:type.isMap
 * @since 1.1.0
 * @param {*} value 检查值
 * @returns {Boolean} 是否为Map
 * @example
 * 
 * import { isMap } from "util-helpers";
 *
 * isMap(new Map)
 * // => true
 *
 * isMap(new WeakMap)
 * // => false
 */
function isMap(value) {
    return isType(value, 'Map');
}

export default isMap