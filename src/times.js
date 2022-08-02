import { digitLength, float2Fixed, checkBoundary, isEffectiveNumeric } from './utils/math.util';

/**
 * 精确乘法，支持多个数相乘
 *
 * @static
 * @alias module:Math.times
 * @since 3.1.0
 * @param {...number|string} nums 相乘的数
 * @returns {number} 乘积
 * @example
 *
 * times(3, 0.6);
 * // => 1.8
 *
 * times(3, 0.6, 2);
 * // => 3.6
 *
 * times(3, 0.6, 2, 10);
 * // => 36
 */
function times(...nums) {
  const [num1, num2, ...rest] = nums;
  if (rest.length > 0) {
    return times(times(num1, num2), ...rest);
  }

  // 兼容处理，如果参数包含无效数值时，尝试取出有效数值参数
  if (!isEffectiveNumeric(num1)) {
    return isEffectiveNumeric(num2) ? Number(num2) : NaN;
  } else if (!isEffectiveNumeric(num2)) {
    return Number(num1);
  }

  const num1Changed = float2Fixed(num1);
  const num2Changed = float2Fixed(num2);
  const baseNum = digitLength(num1) + digitLength(num2);
  const leftValue = num1Changed * num2Changed;

  checkBoundary(leftValue);

  return leftValue / Math.pow(10, baseNum);
}

export default times;
