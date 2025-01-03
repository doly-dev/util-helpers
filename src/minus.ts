import { isNaN } from 'ut2';
import { digitLength, transformEffectiveNumber } from './utils/math.util';
import times from './times';

/**
 * 精确减法，支持多个数相减，减数默认为 0 。
 *
 * @alias module:Math.minus
 * @since 3.1.0
 * @param {...(number|string)} nums 相减的数
 * @returns {number} 差
 * @example
 *
 * minus(1); // 1
 * minus(1, 0.9); // 0.1
 * minus(1, 0.9, 0.02); // 0.08
 * minus(1, 0.9, 0.02, 0.08); // 0
 *
 */
function minus(...nums: (string | number)[]): number {
  // eslint-disable-next-line prefer-const
  // let [num1, num2 = 0, ...rest] = nums;

  let num1 = nums[0];
  let num2 = nums[1] === void 0 ? 0 : nums[1];
  const rest = nums.slice(2);

  if (rest.length > 0) {
    // return minus(minus(num1, num2), ...rest);

    // eslint-disable-next-line prefer-spread
    return minus.apply(void 0, [minus(num1, num2)].concat(rest as number[]));
  }

  num1 = transformEffectiveNumber(num1);
  num2 = transformEffectiveNumber(num2);

  // 兼容处理，如果参数包含无效数值时，返回 NaN
  if (isNaN(num1) || isNaN(num2)) {
    return Number.NaN;
  }

  const baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
  return (times(num1, baseNum) - times(num2, baseNum)) / baseNum;
}

export default minus;
