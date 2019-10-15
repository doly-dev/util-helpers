import isType from './isType';

/**
 * 检查值是否为Function|AsyncFunction|GeneratorFunction|Proxy
 * 
 * @alias module:type.isFunction
 * @since 1.1.0
 * @param {*} value 检查值
 * @returns {Boolean} 是否为Function|AsyncFunction|GeneratorFunction|Proxy
 * @example
 *
 * import { isFunction } from "util-helpers";
 * 
 * isFunction(()=>{}))
 * // => true
 *
 * isFunction(/abc/)
 * // => false
 */
function isFunction(value) {
    return isType(value, 'Function') || isType(value, 'AsyncFunction') || isType(value, 'GeneratorFunction') || isType(value, 'Proxy');
}

export default isFunction