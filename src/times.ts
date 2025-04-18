import { isNaN } from 'ut2';
import { digitLength, float2Fixed, checkBoundary, transformEffectiveNumber } from './utils/math.util';

/**
 * 精确乘法，支持多个数相乘，乘数默认为 1 。
 *
 * @alias module:Math.times
 * @since 3.1.0
 * @param {...(number|string)} nums 相乘的数
 * @returns {number} 乘积
 * @example
 *
 * times(3); // 3
 * times(3, 0.6); // 1.8
 * times(3, 0.6, 2); // 3.6
 * times(3, 0.6, 2, 10); // 36
 *
 */
function times(...nums: (string | number)[]): number {
  // eslint-disable-next-line prefer-const
  // let [num1, num2 = 1, ...rest] = nums;

  let num1 = nums[0];
  let num2 = nums[1] === void 0 ? 1 : nums[1];
  const rest = nums.slice(2);

  if (rest.length > 0) {
    // return times(times(num1, num2), ...rest);

    // eslint-disable-next-line prefer-spread
    return times.apply(void 0, [times(num1, num2)].concat(rest as number[]));
  }

  num1 = transformEffectiveNumber(num1);
  num2 = transformEffectiveNumber(num2);

  // 兼容处理，如果参数包含无效数值时，返回 NaN
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
