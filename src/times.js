import { digitLength, float2Fixed, checkBoundary } from './utils/math.util';
 
/**
 * 精确乘法，支持多个数相乘
 * 
 * @static
 * @alias module:Math.times
 * @since 3.1.0
 * @param {Number} num1 相乘的第一个数
 * @param {Number} num2 相乘的第二个数
 * @param {Number} [others] 相乘的其余数
 * @returns {Number} 乘积
 * @example
 * 
 *  times(3, 0.6);
 *  // => 1.8
 * 
 *  times(3, 0.6, 2);
 *  // => 3.6
 * 
 *  times(3, 0.6, 2, 10);
 *  // => 36
 */
function times(num1, num2, ...others) {
  if (others.length > 0) {
    return times(times(num1, num2), ...others);
  }
  const num1Changed = float2Fixed(num1);
  const num2Changed = float2Fixed(num2);
  const baseNum = digitLength(num1) + digitLength(num2);
  const leftValue = num1Changed * num2Changed;

  checkBoundary(leftValue);

  return leftValue / Math.pow(10, baseNum);
}

export default times;