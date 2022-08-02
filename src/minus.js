import { digitLength, isEffectiveNumeric } from './utils/math.util';
import times from './times';

/**
 * 精确减法，支持多个数相减
 *
 * @static
 * @alias module:Math.minus
 * @since 3.1.0
 * @param {...number|string} nums 相减的数
 * @returns {number} 差
 * @example
 *
 * minus(1, 0.9);
 * // => 0.1
 *
 * minus(1, 0.9, 0.02);
 * // => 0.08
 *
 * minus(1, 0.9, 0.02, 0.08);
 * // => 0
 */
function minus(...nums) {
  const [num1, num2, ...rest] = nums;

  if (rest.length > 0) {
    return minus(minus(num1, num2), ...rest);
  }

  // 兼容处理，如果参数包含无效数值时，尝试取出有效数值参数
  if (!isEffectiveNumeric(num1)) {
    return isEffectiveNumeric(num2) ? Number(num2) : NaN;
  } else if (!isEffectiveNumeric(num2)) {
    return Number(num1);
  }

  const baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
  return (times(num1, baseNum) - times(num2, baseNum)) / baseNum;
}

export default minus;
