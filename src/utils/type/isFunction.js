import isType from './isType';

/**
 * 检查值是否为Function|AsyncFunction|GeneratorFunction|Proxy
 * 
 * @static
 * @alias module:Type.isFunction
 * @since 1.1.0
 * @param {*} value 检查值
 * @returns {Boolean} 是否为Function|AsyncFunction|GeneratorFunction|Proxy
 * @example
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

export default isFunction;