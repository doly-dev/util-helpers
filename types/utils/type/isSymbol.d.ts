export default isSymbol;
/**
 * 检查值是否为Symbol
 *
 * @static
 * @alias module:Type.isSymbol
 * @since 1.1.0
 * @param {*} value 检查值
 * @returns {boolean} 是否为Symbol
 * @example
 *
 * isSymbol(Symbol.iterator)
 * // => true
 *
 * isSymbol("abc")
 * // => false
 */
declare function isSymbol(value: any): boolean;
