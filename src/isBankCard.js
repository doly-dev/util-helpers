import normalizeString from './normalizeString';

// 非0开头，10~21位数字
const reg = /^[1-9]\d{9,20}$/;

// 8~30位数字
const regLoose = /^\d{8,30}$/;

/**
 * luhn 计算校验位
 * @private
 * @param {string} numStr 银行卡前面数字
 * @returns {number}
 */
function sumCheckCode(numStr) {
  const numArr = (numStr + '').replace(/\D/g, '').split('').reverse();

  let sum = 0;
  for (let i = 0; i < numArr.length; i++) {
    const currNum = parseInt(numArr[i]);
    sum += i % 2 === 0 ? currNum * 2 - (currNum > 4 ? 9 : 0) : currNum;
  }
  const mod = sum % 10;
  return mod !== 0 ? 10 - mod : 0;
}

/**
 * 检测值是否为银行卡号。正常模式（非0开头，10~21位数字）宽松模式（8~30位数字）
 *
 * @static
 * @alias module:Validator.isBankCard
 * @see 参考 {@link https://kf.qq.com/faq/170112ABnm6b170112FvquAn.html|常用银行账号位数参考}
 * @since 1.1.0
 * @param {*} value 要检测的值
 * @param {Object} [options] 配置项
 * @param {boolean} [options.loose=false] 宽松模式，8~30位数字
 * @param {boolean} [options.luhn=false] 使用 Luhn 算法校验校验码
 * @returns {boolean} 值是否为银行卡号
 * @example
 *
 * isBankCard('6228480402564890018');
 * // => true
 *
 * isBankCard('6228480402564890');
 * // => true
 *
 * isBankCard('123456789');
 * // => false
 *
 * isBankCard('123456789', { loose: true });
 * // => true
 *
 */
function isBankCard(value, { loose = false, luhn = false } = {}) {
  const valueStr = normalizeString(value);
  const validateResult = loose ? regLoose.test(valueStr) : reg.test(valueStr);

  if (validateResult && luhn) {
    const precode = valueStr.substring(0, valueStr.length - 1);
    const checkCode = valueStr[valueStr.length - 1];
    return checkCode === String(sumCheckCode(precode));
  }
  return validateResult;
}

export default isBankCard;
