import isType from './isType';

/**
 * 检查值是否为ArrayBuffer对象
 *
 * @static
 * @alias module:Type.isArrayBuffer
 * @since 4.16.0
 * @param {*} value 检查值
 * @returns {boolean} 是否为ArrayBuffer对象
 * @example
 *
 * isArrayBuffer(new ArrayBuffer(8))
 * // => true
 *
 * isArrayBuffer({})
 * // => false
 *
 * isArrayBuffer('2012')
 * // => false
 */
function isArrayBuffer(value) {
  return isType(value, 'ArrayBuffer');
}

export default isArrayBuffer;
