import { toString } from 'ut2';

type Options = {
  spaceMark?: string;
};

/**
 * 格式化手机号码
 *
 * @static
 * @alias module:Processor.formatMobile
 * @since 4.5.0
 * @param {string} mobileNo 手机号码
 * @param {Object} [options] 配置项
 * @param {string} [options.spaceMark=' '] 间隔字符，默认`' '`
 * @returns {string} 格式化后的手机号码
 * @example
 *
 * formatMobile('13345678900'); // 133 4567 8900
 * formatMobile('13345678900', { spaceMark: '-' }); // 133-4567-8900
 *
 * // 脱敏手机号码
 * formatMobile('133****1234'); // 133 **** 1234
 * formatMobile('133****1234', { spaceMark: '-' }); // 133-****-1234
 *
 * // 手机号码位数不够
 * formatMobile('133'); // 133
 * formatMobile('133456'); // 133 456
 * formatMobile('13345678'); // 133 4567 8
 *
 */
function formatMobile(mobileNo = '', options?: Options) {
  const { spaceMark = ' ' } = options || {};

  const regChar = new RegExp(spaceMark, 'g');
  const realValue = toString(mobileNo).replace(regChar, '').substring(0, 11);

  if (realValue.length > 7) {
    return realValue.replace(/^(...)(....)/g, `$1${spaceMark}$2${spaceMark}`);
  }
  if (realValue.length > 3) {
    return realValue.replace(/^(...)/g, `$1${spaceMark}`);
  }
  return realValue;
}

export default formatMobile;
