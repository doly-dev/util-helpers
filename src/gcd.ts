import { isNaN, round, toNumber } from 'ut2';

/**
 * 最大公约数，使用辗转相除法。
 *
 * 遵循以下约定：
 *
 * 1. 如果参数中包含无效数值，返回 `NaN` 。
 * 2. 如果全部参数都为 `0` ，返回 `0` 。
 * 3. 如果参数包含 `0` ，仅计算非零的数。
 * 4. 如果参数为负数，将转为绝对值的正数。
 * 5. 如果参数包含小数点，将转为四舍五入的整数。
 *
 * @static
 * @alias module:Math.gcd
 * @since 4.20.0
 * @see {@link https://baike.baidu.com/item/最大公约数 | 最大公约数}
 * @param {...(number|string)} nums 两个或多个整数。
 * @returns {number} 最大公约数。
 * @example
 *
 * gcd(8, 14); // 2
 * gcd(57, 48); // 3
 * gcd(140, 21, 42); // 7
 * gcd('foo', 'bar'); // NaN
 * gcd(0, 10); // 10
 * gcd(2.3, 3.8, 8, -10); // 2
 *
 */
function gcd(...nums: (string | number)[]): number {
  let num1 = nums[0];
  let num2 = nums[1] === void 0 ? 0 : nums[1];
  const rest = nums.slice(2);

  if (rest.length > 0) {
    // eslint-disable-next-line prefer-spread
    return gcd.apply(void 0, [gcd(num1, num2)].concat(rest as number[]));
  }

  num1 = Math.abs(round(num1 as number));
  num2 = Math.abs(round(num2 as number));

  // 兼容处理，如果参数包含无效数值时，返回 NaN
  if (isNaN(num1) || isNaN(num2)) {
    return Number.NaN;
  }

  if (num1 === 0 && num2 === 0) {
    return 0;
  }

  if (num1 === 0) {
    return num2;
  }

  if (num2 === 0) {
    return num1;
  }

  let temp = num2;
  if (num1 < num2) {
    temp = num1;
    num1 = num2;
    num2 = temp;
  }

  while (temp) {
    temp = num1 % num2;
    num1 = num2;
    num2 = temp;
  }
  return toNumber(num1);
}

export default gcd;
