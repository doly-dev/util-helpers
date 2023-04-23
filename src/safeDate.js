/**
 * @overload
 * @return {Date}
 */

/**
 * @overload
 * @param {number | string | Date} value Unix时间戳、时间戳字符串 dateString 、Date 日期对象
 * @return {Date}
 */

/**
 * @overload
 * @param {number} year 表示年份的整数值。0 到 99 会被映射至 1900 年至 1999 年，其他值代表实际年份。
 * @param {number} monthIndex 表示月份的整数值，从 0（1 月）到 11（12 月）。
 * @param {number} [date] 表示一个月中的第几天的整数值，从 1 开始。默认值为 1。
 * @param {number} [hours] 表示一天中的小时数的整数值 (24 小时制)。默认值为 0（午夜）。
 * @param {number} [minutes] 表示一个完整时间（如 01:10:00）中的分钟部分的整数值。默认值为 0。
 * @param {number} [seconds] 表示一个完整时间（如 01:10:00）中的秒部分的整数值。默认值为 0。
 * @param {number} [ms] 表示一个完整时间的毫秒部分的整数值。默认值为 0。
 * @return {Date}
 */

/**
 * 创建一个 Date 实例日期对象，同 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date#%E5%8F%82%E6%95%B0">new Date()</a> <br/><br/>
 * 
 * 规避了苹果设备浏览器不支持部分格式（例如，YYYY-MM-DD HH-mm 或 YYYY.MM.DD）。<br/>
 * 如果参数为 undefined 正常返回 Date 。
 *
 * @static
 * @alias module:Processor.safeDate
 * @since 4.4.0
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date|Date}
 * @param {string|number|Date} [value] 日期时间字符串、毫秒数、日期对象
 * @param {...number} args 月/日/时/分/秒/毫秒
 * @returns {Date} Date 实例日期对象
 * @example
 * 
 * safeDate('2022-1-1'); // Sat Jan 01 2022 00:00:00 GMT+0800 (中国标准时间)
 * safeDate('2022/1/1'); // Sat Jan 01 2022 00:00:00 GMT+0800 (中国标准时间)
 * safeDate('2022.1.1'); // Sat Jan 01 2022 00:00:00 GMT+0800 (中国标准时间)
 * safeDate('2022.1.1 11:11'); // Sat Jan 01 2022 11:11:00 GMT+0800 (中国标准时间)
 * safeDate(99, 1); // Mon Feb 01 1999 00:00:00 GMT+0800 (中国标准时间)
 * safeDate(1646711233171); // Tue Mar 08 2022 11:47:13 GMT+0800 (中国标准时间)
 */
function safeDate(value, ...args) {
  const safeValue = typeof value === 'string' ? value.replace(/[\\.-]/g, '/') : value;

  if (args && args.length > 0) {
    // @ts-ignore
    return new Date(safeValue, ...args);
  }

  return typeof safeValue === 'undefined' ? new Date() : new Date(safeValue);
}

export default safeDate;
