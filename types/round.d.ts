export default round;
/**
 * 四舍五入，支持设置精度
 *
 * @static
 * @alias module:Math.round
 * @since 3.1.0
 * @param {number} num 要四舍五入的数字
 * @param {number} [precision=0] 四舍五入的精度
 * @returns {number} 四舍五入的数字
 * @example
 *
 *  round(4.006);
 *  // => 4
 *
 *  round(4.006, 2);
 *  // => 4.01
 *
 *  round(4060, -2);
 *  // => 4100
 */
declare function round(num: number, precision?: number | undefined): number;
