import { digitLength, float2Fixed, checkBoundary, transformEffectiveNumber } from './utils/math.util';

/**
 * 精确乘法，支持多个数相乘，乘数默认为 1 。
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
  let [num1, num2 = 1, ...rest] = nums;
  if (rest.length > 0) {
    return times(times(num1, num2), ...rest);
  }

  num1 = transformEffectiveNumber(num1);
  num2 = transformEffectiveNumber(num2);

  // 兼容处理，如果参数包含无效数值时，返回 NaN
  // @ts-ignore
  if (isNaN(num1) || isNaN(num2)) {
    return Number.NaN;
  }

  const num1Changed = float2Fixed(num1);
  const num2Changed = float2Fixed(num2);
  const baseNum = digitLength(num1) + digitLength(num2);
  const leftValue = num1Changed * num2Changed;

  checkBoundary(leftValue);

  return leftValue / Math.pow(10, baseNum);
}

export default times;
