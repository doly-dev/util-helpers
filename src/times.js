import { digitLength, float2Fixed, checkBoundary } from './utils/math.util';
import { isNumber, isNaN, isString } from './utils/type';

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

  // 兼容处理，如果第2个参数为非数字或字符串时，返回第一个参数
  if ((!isNumber(num2) || isNaN(num2)) && !isString(num2)) {
    // @ts-ignore
    return num1;
  }

  const num1Changed = float2Fixed(num1);
  const num2Changed = float2Fixed(num2);
  const baseNum = digitLength(num1) + digitLength(num2);
  const leftValue = num1Changed * num2Changed;

  checkBoundary(leftValue);

  return leftValue / Math.pow(10, baseNum);
}

export default times;
