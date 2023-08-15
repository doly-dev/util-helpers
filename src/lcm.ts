import divide from './divide';
import times from './times';
import gcd from './gcd';
import { round } from 'ut2';

/**
 * 最小公倍数。
 *
 * 遵循以下约定：
 *
 * 1. 如果参数中包含无效数值，返回 `NaN` 。
 * 2. 如果只有一个参数，另一个参数默认为 `1` 。
 * 3. 如果全部参数都为 `0` ，返回 `NaN` 。因为作为除数的最大公约数为 `0` ，结果为 `NaN` 。
 * 4. 如果全部参数都为 `Infinity` ，返回 `NaN` 。因为除数和被除数都是 `Infinity` ，结果为 `NaN` 。
 * 5. 如果参数包含 `0` ，返回 `0` 。
 * 6. 如果参数为负数，将转为绝对值的正数。
 * 7. 如果参数包含小数点，将转为四舍五入的整数。
 *
 * @static
 * @alias module:Math.lcm
 * @since 4.20.0
 * @see {@link https://baike.baidu.com/item/最小公倍数 | 最小公倍数}
 * @param {...(number|string)} nums 两个或多个整数。
 * @returns {number} 最小公倍数。
 * @example
 *
 * lcm(3, 4); // 12
 * lcm(8, 4); // 8
 * lcm(2, 4, 8); // 32
 * lcm('foo', 'bar'); // NaN
 * lcm(0, 10); // 0
 * lcm(2.3, 3.8, 8, -10); // 320
 *
 */
function lcm(...nums: (string | number)[]): number {
  let args = nums.map((item) => Math.abs(round(item as number)));
  if (args.length === 1) {
    args = args.concat([1]);
  }
  const product = args.indexOf(0) > -1 ? 0 : times(...args);
  return divide(product, gcd(...args));
}

export default lcm;
