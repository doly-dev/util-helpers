export default plus;
/**
 * 精确加法，支持多个数相加
 *
 * @static
 * @alias module:Math.plus
 * @since 3.1.0
 * @param {number} num1 相加的第一个数
 * @param {number} num2 相加的第二个数
 * @param {...number} others 相加的其余数
 * @returns {number} 总和
 * @example
 *
 *  plus(0.1, 0.2);
 *  // => 0.3
 *
 *  plus(0.1, 0.2, 0.3);
 *  // => 0.6
 *
 *  plus(0.1, 0.2, 0.3, 0.4);
 *  // => 1
 */
declare function plus(num1: number, num2: number, ...others: number[]): number;
