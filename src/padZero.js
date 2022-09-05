import normalizeString from './normalizeString';

/**
 * 前置补零
 *
 * @static
 * @alias module:Processor.padZero
 * @since 4.7.0
 * @param {string|number} value 要处理的值
 * @param {number} [size=2] 指定字符串长度
 * @returns {string} 用零填充数字到给定长度的字符串
 * @example
 * padZero(5); // 05
 * padZero('5'); // 05
 *
 * padZero(12); // 12
 * padZero('12'); // 12
 *
 * padZero(688); // 688
 * padZero('688'); // 688
 *
 * padZero(688, 5); // 00688
 * padZero('688', 5); // 00688
 * 
 */
function padZero(value, size = 2) {
  const str = normalizeString(value);
  const len = str.length;

  if (typeof size !== 'number' || size < 0) {
    size = 0;
  }

  if (len < size) {
    return '0'.repeat(size - len) + str;
  }
  return str;
}

export default padZero;
