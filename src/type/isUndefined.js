/**
 * 检查值是否为Undefined
 * 
 * @alias module:type.isUndefined
 * @since 1.1.0
 * @param {*} value 检查值
 * @returns {Boolean} 是否为Undefined
 * @example
 * 
 * import { isUndefined } from "util-helpers";
 *
 * isUndefined(undefined)
 * // => true
 *
 * isUndefined(void 0)
 * // => true
 *
 * isUndefined(null)
 * // => false
 */
function isUndefined(value) {
    return value === void 0;
}

export default isUndefined