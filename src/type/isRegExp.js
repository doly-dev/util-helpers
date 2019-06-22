import isType from './isType';

/**
 * 检查值是否为RegExp类型
 * 
 * @module type/isRegExp
 * @since 1.1.0
 * @param {*} value 检查值
 * @returns {Boolean} 是否为RegExp类型
 * @example
 *
 * isRegExp(/abc/)
 * // => true
 *
 * isRegExp('/abc/')
 * // => false
 */
function isRegExp(value) {
    return isType(value, 'RegExp');
}

export default isRegExp