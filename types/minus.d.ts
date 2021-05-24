export default minus;
/**
 * 精确减法，支持多个数相减
 *
 * @static
 * @alias module:Math.minus
 * @since 3.1.0
 * @param {number} num1 相减的第一个数
 * @param {number} num2 相减的第二个数
 * @param {...number} others 相减的第其余数
 * @returns {number} 差
 * @example
 *
 *  minus(1, 0.9);
 *  // => 0.1
 *
 *  minus(1, 0.9, 0.02);
 *  // => 0.08
 *
 *  minus(1, 0.9, 0.02, 0.08);
 *  // => 0
 */
declare function minus(num1: number, num2: number, ...others: number[]): number;
