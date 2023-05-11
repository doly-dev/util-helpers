import isType from './isType';

/**
 * 检查值是否为Blob对象
 *
 * <em style="font-weight: bold;">注意：该方法仅适用于浏览器端。</em>
 *
 * @static
 * @alias module:Type.isBlob
 * @since 4.16.0
 * @param {*} value 检查值
 * @returns {boolean} 是否为Blob对象
 * @example
 *
 * isBlob(new Blob(['a']))
 * // => true
 *
 * isBlob({})
 * // => false
 *
 * isBlob('2012')
 * // => false
 */
function isBlob(value: any) {
  return isType(value, 'Blob');
}

export default isBlob;
