import { isNaN } from 'ut2';
import divide from './divide';
import times from './times';
import { transformEffectiveNumber } from './utils/math.util';

/**
 * 四舍五入，支持设置精度
 *
 * @static
 * @alias module:Math.round
 * @since 3.1.0
 * @param {number|string} num 要四舍五入的数字
 * @param {number} [precision=0] 四舍五入的精度
 * @returns {number} 四舍五入的数字
 * @example
 *
 * round(4.006); // 4
 * round(4.006, 2); // 4.01
 * round(4060, -2); // 4100
 *
 */
function round(num: string | number, precision = 0) {
  num = transformEffectiveNumber(num);

  // 兼容处理，如果参数包含无效数值时，返回 NaN
  if (isNaN(num)) {
    return Number.NaN;
  }

  const base = Math.pow(10, precision);
  return divide(Math.round(times(num, base)), base);
}

export default round;
