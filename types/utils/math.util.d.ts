/**
 * 是否为科学计数法数字
 *
 * @param {string} num 检查值
 * @returns {boolean}
 */
export function isScientificNumber(num: string): boolean;
/**
 * 把错误的数据转正
 *
 * @param {number} num 输入数
 * @param {number} [precision=12] 小数点的精度
 * @returns {number}
 * @example
 *
 *  strip(0.09999999999999998)=0.1
 */
export function strip(num: number, precision?: number | undefined): number;
/**
 * 计算数字的小数点长度，支持科学记数法
 *
 * @param {number} num 输入数
 * @returns {number} 小数点长度
 */
export function digitLength(num: number): number;
/**
 * 把小数转成整数，支持科学计数法。如果是小数则放大成整数
 *
 * @param {number} num 输入数
 * @returns {number}
 */
export function float2Fixed(num: number): number;
/**
 * 检测数字是否越界，如果越界给出提示
 * @param {number} num 输入数
 * @returns
 */
export function checkBoundary(num: number): void;
/**
 * 科学计数法转换成普通数字
 *
 * JavaScript在以下情景会自动将数值转换为科学计数法：
 *  1.小数点前的数字个数大于等于22位
 *  2.小数点前边是0，小数点后十分位（包含十分位）之后连续零的个数大于等于6个
 *
 * @param {string | number} num 科学计数法数字
 * @returns {string} 转换后的数字字符串
 */
export function scientificToNumber(num: string | number): string;
