import { isNaN } from 'ut2';
import { strip, digitLength, float2Fixed, checkBoundary, transformEffectiveNumber } from './utils/math.util';
import times from './times';

/**
 * 精确除法，支持多个数相除，除数默认为 1 。
 *
 * @static
 * @alias module:Math.divide
 * @since 3.1.0
 * @param {...number|string} nums 被除数和除数
 * @returns {number} 商数
 * @example
 *
 * divide(1.21); // 1.21 除数默认为 1 ，即 1.21/1 = 1.21
 * divide(1.21, 1.1); // 1.1
 * divide(1000, 10, 10); // 10
 * divide(1000, 10, 10, 10); // 1
 *
 * divide(); // NaN  如果没有传入参数，被除数默认为 undefined 。 Number(undefined) 转换为 NaN ，NaN/1 = NaN
 * divide(null); // 0  Number(null) 转换为 0 ， 0/1 = 0
 * divide('1.5 ', 0.5); // 3  Number('1.5 ') 转换为 1.5 ，1.5/0.5 = 3
 *
 */
function divide(...nums: (string | number)[]): number {
  // eslint-disable-next-line prefer-const
  let [num1, num2 = 1, ...rest] = nums;

  if (rest.length > 0) {
    return divide(divide(num1, num2), ...rest);
  }

  num1 = transformEffectiveNumber(num1);
  num2 = transformEffectiveNumber(num2);

  // 兼容处理，如果参数包含无效数值时，返回 NaN
  if (isNaN(num1) || isNaN(num2)) {
    return Number.NaN;
  }

  const num1Changed = float2Fixed(num1);
  const num2Changed = float2Fixed(num2);
  checkBoundary(num1Changed);
  checkBoundary(num2Changed);
  // fix: 类似 10 ** -4 为 0.00009999999999999999，strip 修正
  return times(num1Changed / num2Changed, strip(Math.pow(10, digitLength(num2) - digitLength(num1))));
}

export default divide;
