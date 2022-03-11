import isNil from './utils/type/isNil';

// TODO: 函数重载，类型参照 Date

/**
 * 创建一个 Date 实例日期对象，同 new Date() 。<br/>
 * 规避了苹果设备浏览器不支持部分格式（YYYY-MM-DD HH-mm 或 YYYY.MM.DD）。
 *
 * @static
 * @alias module:Processor.safeDate
 * @see 参考 {@link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date|Date}
 * @since 4.4.0
 * @param {string|number|Date} [value] 日期时间字符串、毫秒数、日期对象
 * @param {...number} args 月/日/时/分/秒/毫秒
 * @returns {Date} Date 实例日期对象
 * @example
 * safeDate('2022-1-1'); // Sat Jan 01 2022 00:00:00 GMT+0800 (中国标准时间)
 * safeDate('2022/1/1'); // Sat Jan 01 2022 00:00:00 GMT+0800 (中国标准时间)
 * safeDate('2022.1.1'); // Sat Jan 01 2022 00:00:00 GMT+0800 (中国标准时间)
 * safeDate('2022.1.1 11:11'); // Sat Jan 01 2022 11:11:00 GMT+0800 (中国标准时间)
 * safeDate(99, 1); // Mon Feb 01 1999 00:00:00 GMT+0800 (中国标准时间)
 * safeDate(1646711233171); // Tue Mar 08 2022 11:47:13 GMT+0800 (中国标准时间)
 *
 */
function safeDate(value, ...args) {
  const safeValue = typeof value === 'string' ? value.replace(/[\\.-]/g, '/') : value;

  if (args && args.length > 0) {
    // @ts-ignore
    return new Date(safeValue, ...args);
  }

  // @ts-ignore
  return isNil(safeValue) ? new Date() : new Date(safeValue);
}

export default safeDate;
