import convertToString from './utils/convertToString';

// 基础规则，由18位数字和大写字母组成，不使用I、O、Z、S、V。
const baseReg = /^[\dA-HJ-NPQRTUWXY]{2}\d{6}[\dA-HJ-NPQRTUWXY]{10}$/;

// 基础字符组成
const baseCodeArr = '0123456789ABCDEFGHJKLMNPQRTUWXY'.split('');

/**
 * 计算校验码
 *
 * @private
 * @since 1.1.0
 * @param {string} preCode 统一代码前17位
 * @returns {string} 校验码
 */
function sumCheckCode(preCode) {
  let total = 0;

  // 计算字符位置对应序号和加权因子的乘积，总和
  for (let i = 0; i < 17; i++) {
    // 字符位置对应的基础编码序号
    const index = baseCodeArr.findIndex((item) => item === preCode[i]);
    // 加权因子
    const wf = Math.pow(3, i) % 31;
    // 计算序号和加权因子的乘积，并计算级数之和
    total += index * wf;
  }

  // 计算整数求余函数MOD
  const remainder = total % 31;
  // 校验码字符值序号
  const checkCodeIndex = remainder !== 0 ? 31 - remainder : 0;

  return baseCodeArr[checkCodeIndex];
}

/**
 * 检测值是否为统一社会信用代码，也叫三证合一组织代码。由18位数字和大写字母组成，不使用I、O、Z、S、V。
 *
 * @static
 * @alias module:Validator.isSocialCreditCode
 * @see 参考 {@link https://zh.wikisource.org/zh-hans/GB_32100-2015_法人和其他组织统一社会信用代码编码规则|GB 32100-2015 法人和其他组织统一社会信用代码编码规则}
 * @since 1.1.0
 * @param {*} value 要检测的值
 * @param {Object} [options] 配置项
 * @param {boolean} [options.loose=false] 宽松模式。如果为true，不校验校验位。
 * @returns {boolean} 值是否为统一社会信用代码
 * @example
 *
 * isSocialCreditCode('91350100M000100Y43');
 * // => true
 *
 * isSocialCreditCode('91350100M000100Y4A');
 * // => false
 *
 * // 宽松模式，不校验校验位。所以也可以通过
 * isSocialCreditCode('91350100M000100Y4A', {loose: true});
 * // => true
 *
 */
function isSocialCreditCode(value, { loose = false } = {}) {
  const valueStr = convertToString(value);

  const passBaseRule = baseReg.test(valueStr);

  // 宽松模式 或 基础规则不通过直接返回
  if (loose || !passBaseRule) {
    return passBaseRule;
  }

  // 前17位
  const preCode = valueStr.substring(0, 17);
  // 校验码
  const lastCode = valueStr.substring(valueStr.length - 1);
  // 计算校验码
  const checkCode = sumCheckCode(preCode);

  return lastCode === checkCode;
}

export default isSocialCreditCode;
