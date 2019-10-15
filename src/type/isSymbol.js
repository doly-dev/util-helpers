import isType from './isType';

/**
 * 检查值是否为Symbol
 * 
 * @alias module:type.isSymbol
 * @since 1.1.0
 * @param {*} value 检查值
 * @returns {Boolean} 是否为Symbol
 * @example
 * 
 * import { isSymbol } from "util-helpers";
 *
 * isSymbol(Symbol.iterator)
 * // => true
 *
 * isSymbol("abc")
 * // => false
 */
function isSymbol(value) {
    return isType(value, 'Symbol');
}

export default isSymbol