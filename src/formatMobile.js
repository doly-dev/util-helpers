import normalizeString from './normalizeString';

/**
 * 格式化手机号码
 *
 * @static
 * @alias module:Processor.formatMobile
 * @since 4.5.0
 * @param {string} mobileNo 手机号码
 * @param {object} [options] 配置项
 * @param {string} [options.char=' '] 间隔字符
 * @returns {string} 格式化后的手机号码
 * @example
 * formatMobile('13345678900') // '133 4567 8900'
 * formatMobile('13345678900', { char: '-' }) // '133-4567-8900'
 * formatMobile('133****1234') // '133 **** 1234'
 * formatMobile('133****1234', { char: '-' }) // '133-****-1234'
 */
function formatMobile(mobileNo, { char = ' ' } = {}) {
  const regChar = new RegExp(char, 'g');
  const realValue = normalizeString(mobileNo).replace(regChar, '').substring(0, 11);

  if (realValue.length > 7) {
    return realValue.replace(/^(...)(....)/g, `$1${char}$2${char}`);
  }
  if (realValue.length > 3) {
    return realValue.replace(/^(...)/g, `$1${char}`);
  }
  return realValue;
}

export default formatMobile;