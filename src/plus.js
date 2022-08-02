import { digitLength, isEffectiveNumeric } from './utils/math.util';
import times from './times';

/**
 * 精确加法，支持多个数相加
 *
 * @static
 * @alias module:Math.plus
 * @since 3.1.0
 * @param {...number|string} nums 相加的数
 * @returns {number} 总和
 * @example
 *
 * plus(0.1, 0.2);
 * // => 0.3
 *
 * plus(0.1, 0.2, 0.3);
 * // => 0.6
 *
 * plus(0.1, 0.2, 0.3, 0.4);
 * // => 1
 */
function plus(...nums) {
  const [num1, num2, ...rest] = nums;

  if (rest.length > 0) {
    return plus(plus(num1, num2), ...rest);
  }

  // 兼容处理，如果参数包含无效数值时，尝试取出有效数值参数
  if (!isEffectiveNumeric(num1)) {
    return isEffectiveNumeric(num2) ? Number(num2) : NaN;
  } else if (!isEffectiveNumeric(num2)) {
    return Number(num1);
  }

  const baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
  return (times(num1, baseNum) + times(num2, baseNum)) / baseNum;
}

export default plus;
