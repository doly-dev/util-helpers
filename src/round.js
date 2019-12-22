import divide from './divide';
import times from './times';

/**
 * 四舍五入，支持设置精度
 * 
 * @static
 * @alias module:Math.round
 * @since 3.1.0
 * @param {Number} num 要四舍五入的数字
 * @param {Number} [precision=0] 四舍五入的精度
 * @returns {Number} 四舍五入的数字
 * @example
 * 
 *  round(4.006);
 *  // => 4
 * 
 *  round(4.006, 2);
 *  // => 4.01
 * 
 *  round(4060, -2);
 *  // => 4100
 */
function round(num, precision=0) {
  const base = Math.pow(10, precision);
  return divide(Math.round(times(num, base)), base);
}

export default round;