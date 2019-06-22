const toString = Object.prototype.toString

/**
 * 检测值的 `toString` 类型
 *
 * @private
 * @since 1.1.0
 * @param {*} value 检查值
 * @param {String} typename 类型名称
 * @returns {string} 返回值的 `toString` 类型是否匹配
 */
function isType(value, typename) {
    return toString.call(value) === `[object ${typename}]`;
}

export default isType