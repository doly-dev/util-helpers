/**
 * 检查值是否为Null
 *
 * @static
 * @alias module:Type.isNull
 * @since 1.1.0
 * @param {*} value 检查值
 * @returns {boolean} 是否为Null
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

export default isNull;
