export default divide;
/**
 * 精确除法，支持多个数相除
 *
 * @static
 * @alias module:Math.divide
 * @since 3.1.0
 * @param {number} num1 除数
 * @param {number} num2 被除数
 * @param {...number} others 其余被除数
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
declare function divide(num1: number, num2: number, ...others: number[]): number;
