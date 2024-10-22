import { round } from 'ut2';

/**
 * 四舍五入，支持设置精度
 *
 * @alias module:Math.round
 * @since 3.1.0
 * @param {number|string} num 要四舍五入的数字
 * @param {number} [precision=0] 四舍五入的精度，默认`0`
 * @returns {number} 四舍五入的数字
 * @example
 *
 * round(4.006); // 4
 * round(4.006, 2); // 4.01
 * round(4060, -2); // 4100
 *
 */
function _round(num: string | number, precision = 0) {
  return round(num as number, precision);
}

export default _round;
