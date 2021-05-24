export default formatMoney;
/**
 * 格式化金额
 *
 * @static
 * @alias module:Processor.formatMoney
 * @since 1.1.0
 * @param {string | number} num 需转换金额 (最大：9007199254740991 最小： -9007199254740991)
 * @param {Object} [options] - 金额格式化配置
 * @param {string | number} [options.precision=2] - 保留位数 （最高：10位）
 * @param {string} [options.symbol] - 货币符号
 * @param {string} [options.thousand=","] - 千分位符号
 * @param {string} [options.decimal="."] - 小数位符号
 * @returns {string} 格式化的金额
 * @example
 *
 * // 整数
 * formatMoney('1000');
 * // => 1,000.00
 *
 * // 小数（默认保留2位小数）
 * formatMoney('3000.03');
 * // => 3,000.03
 *
 * // 保留4位小数
 * formatMoney('3000.0300', { precision: 4 });
 * // => 3,000.0300
 *
 * // 保留10位小数
 * formatMoney('1500.2', { precision: 10 });
 * // => 1,500.2000000000
 *
 * // 自定义单位符号
 * formatMoney(1000.00, { symbol: '$' });
 * // => $1,000.00
 *
 * // 自定义千位分割符（默认','）
 * formatMoney(1000.00, { thousand: '|' });
 * // => 1|000.00
 *
 * // 自定义小数位分割符(默认'.')
 * formatMoney(1000.00, { decimal: '&' });
 * // => 1,000&00
 */
declare function formatMoney(num: string | number, { precision, symbol, thousand, decimal }?: {
    precision?: string | number | undefined;
    symbol?: string | undefined;
    thousand?: string | undefined;
    decimal?: string | undefined;
} | undefined): string;
