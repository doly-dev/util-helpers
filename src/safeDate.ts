interface SafeDate {
  (): Date;
  (value: number | string | Date): Date;
  (year: number, monthIndex: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number): Date;
}

/**
 * 创建一个 Date 实例日期对象，同 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date#%E5%8F%82%E6%95%B0">new Date()</a>
 *
 * 规避了苹果设备浏览器不支持部分格式（例如，YYYY-MM-DD HH-mm 或 YYYY.MM.DD）。
 *
 * 如果参数为 undefined 正常返回 Date 。
 *
 * @function
 * @alias module:Processor.safeDate
 * @since 4.4.0
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date | Date}
 * @param {string|number|Date} [value] 日期时间字符串、毫秒数、日期对象
 * @param {...number} [args] 月/日/时/分/秒/毫秒
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
const safeDate: SafeDate = function (value?: number | string | Date, ...args: any[]) {
  const safeValue = typeof value === 'string' ? value.replace(/[\\.-]/g, '/') : value;

  if (args && args.length > 0) {
    // @ts-ignore
    return new Date(safeValue, ...args);
  }

  return typeof safeValue === 'undefined' ? new Date() : new Date(safeValue);
};

export default safeDate;
