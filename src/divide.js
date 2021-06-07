import { strip, digitLength, float2Fixed, checkBoundary } from './utils/math.util';
import times from './times';

/**
 * 精确除法，支持多个数相除
 * 
 * @static
 * @alias module:Math.divide
 * @since 3.1.0
 * @param {number|string} num1 除数
 * @param {number|string} num2 被除数
 * @param {...number|string} others 其余被除数
 * @returns {number} 商数
 * @example
 * 
 *  divide(1.21, 1.1);
 *  // => 1.1
 * 
 *  divide(1000, 10, 10);
 *  // => 10
 * 
 *  divide(1000, 10, 10, 10);
 *  // => 1
 */
function divide(num1, num2, ...others) {
  if (others.length > 0) {
    // @ts-ignore
    return divide(divide(num1, num2), ...others);
  }
  const num1Changed = float2Fixed(num1);
  const num2Changed = float2Fixed(num2);
  checkBoundary(num1Changed);
  checkBoundary(num2Changed);
  // fix: 类似 10 ** -4 为 0.00009999999999999999，strip 修正
  return times((num1Changed / num2Changed), strip(Math.pow(10, digitLength(num2) - digitLength(num1))));
}

export default divide;