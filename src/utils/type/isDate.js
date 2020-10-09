import isType from './isType';

/**
 * 检查值是否为Date
 * 
 * @static
 * @alias module:Type.isDate
 * @since 1.1.0
 * @param {*} value 检查值
 * @returns {boolean} 是否为Date
 * @example
 *
 * isDate(new Date)
 * // => true
 *
 * isDate('Mon April 23 2012')
 * // => false
 */
function isDate(value) {
  return isType(value, 'Date');
}

export default isDate;