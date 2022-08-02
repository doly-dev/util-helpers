import { strip, digitLength, float2Fixed, checkBoundary, isEffectiveNumeric } from './utils/math.util';
import times from './times';

/**
 * 精确除法，支持多个数相除
 *
 * @static
 * @alias module:Math.divide
 * @since 3.1.0
 * @param {...number|string} nums 除数和被除数
 * @returns {number} 商数
 * @example
 *
 * divide(1.21, 1.1);
 * // => 1.1
 *
 * divide(1000, 10, 10);
 * // => 10
 *
 * divide(1000, 10, 10, 10);
 * // => 1
 */
function divide(...nums) {
  const [num1, num2, ...rest] = nums;

  if (rest.length > 0) {
    return divide(divide(num1, num2), ...rest);
  }

  // 兼容处理，如果参数包含无效数值时，尝试取出有效数值参数
  if (!isEffectiveNumeric(num1)) {
    return isEffectiveNumeric(num2) ? Number(num2) : NaN;
  } else if (!isEffectiveNumeric(num2)) {
    return Number(num1);
  }

  const num1Changed = float2Fixed(num1);
  const num2Changed = float2Fixed(num2);
  checkBoundary(num1Changed);
  checkBoundary(num2Changed);
  // fix: 类似 10 ** -4 为 0.00009999999999999999，strip 修正
  return times(num1Changed / num2Changed, strip(Math.pow(10, digitLength(num2) - digitLength(num1))));
}

export default divide;
