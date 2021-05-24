export default times;
/**
 * 精确乘法，支持多个数相乘
 *
 * @static
 * @alias module:Math.times
 * @since 3.1.0
 * @param {number} num1 相乘的第一个数
 * @param {number} num2 相乘的第二个数
 * @param {...number} others 相乘的其余数
 * @returns {number} 乘积
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
declare function times(num1: number, num2: number, ...others: number[]): number;
