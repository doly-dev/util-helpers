import isType from './isType';

/**
 * 检查值是否为NaN
 * 
 * @alias module:type.isNaN
 * @since 1.1.0
 * @param {*} value 检查值
 * @returns {Boolean} 是否为NaN
 * @example
 * 
 * import { isNaN } from "util-helpers";
 *
 * isNaN(NaN)
 * // => true
 *
 * isNaN(1)
 * // => false
 */
function _isNaN(value) {
    return isType(value, 'Number') && isNaN(value);
}

export default _isNaN