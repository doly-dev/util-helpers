import normalizeString from './normalizeString';

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
 * @since 1.1.0
 * @see {@link https://zh.wikisource.org/zh-hans/GB_32100-2015_法人和其他组织统一社会信用代码编码规则|GB 32100-2015 法人和其他组织统一社会信用代码编码规则}
 * @param {*} value 要检测的值
 * @param {Object} [options] 配置项
 * @param {boolean} [options.checkCode=true] 是否校验最后一位校验码，如果为false，不校验校验位。
 * @returns {boolean} 值是否为统一社会信用代码
 * @example
 *
 * isSocialCreditCode('91350100M000100Y43'); // true
 * isSocialCreditCode('91350100M000100Y4A'); // false
 *
 * // 不校验校验位，长度和类型还是有校验的
 * isSocialCreditCode('91350100M000100Y4A', { checkCode: false }); // true
 * isSocialCreditCode('91350100M000100YIO', { checkCode: false }); // false
 * isSocialCreditCode('91350100M000100Y', { checkCode: false }); // false
 *
 */
function isSocialCreditCode(value, options = {}) {
  const valueStr = normalizeString(value);
  // @ts-ignore
  // TODO 下个版本废弃 loose
  const { loose = false, checkCode: cc = true } = options;
  const needCheckCode = !loose && cc;

  const passBaseRule = baseReg.test(valueStr);

  // 宽松模式 或 基础规则不通过直接返回
  if (!needCheckCode || !passBaseRule) {
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
