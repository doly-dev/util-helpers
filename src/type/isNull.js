/**
 * 检查值是否为Null
 * 
 * @alias module:type.isNull
 * @since 1.1.0
 * @param {*} value 检查值
 * @returns {Boolean} 是否为Null
 * @example
 * 
 * import { isNull } from "util-helpers";
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