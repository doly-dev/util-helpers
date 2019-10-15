import isType from './isType';

/**
 * 检查值是否为Arguments
 * 
 * @alias module:type.isArguments
 * @since 1.1.0
 * @param {*} value 检查值
 * @returns {Boolean} 是否为Arguments
 * @example
 * 
 * import { isArguments } from "util-helpers";
 *
 * isArguments(function() { return arguments }())
 * // => true
 *
 * isArguments([1, 2, 3])
 * // => false
 */
function isArguments(value) {
    return isType(value, 'Arguments');
}

export default isArguments