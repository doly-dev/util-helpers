export default isArguments;
/**
 * 检查值是否为Arguments
 *
 * @static
 * @alias module:Type.isArguments
 * @since 1.1.0
 * @param {*} value 检查值
 * @returns {boolean} 是否为Arguments
 * @example
 *
 * isArguments(function() { return arguments }())
 * // => true
 *
 * isArguments([1, 2, 3])
 * // => false
 */
declare function isArguments(value: any): boolean;
