import { toString } from 'ut2';

// 基础规则，由14位数字本体码和1位数字校验码组成，其中本体码从左至右依次为：6位首次登记机关码、8位顺序码。
const baseReg = /^\d{15}$/;

/**
 * 计算校验码
 *
 * @private
 * @since 3.5.0
 * @param {string} preCode 营业执照前14位
 * @returns {number} 校验码
 */
function sumCheckCode(preCode: string) {
  let retNum; // 校验位数字

  let pj = 10; // Pj+1 11，初始为10

  for (let j = 0; j < 14; j++) {
    const sj = pj + Number(preCode[j]);
    let sj10 = sj % 10;
    sj10 = sj10 === 0 ? 10 : sj10;
    const pj1 = sj10 * 2;
    pj = pj1 % 11;
  }

  // 反模10计算
  if (pj === 1) {
    retNum = 0;
  } else {
    retNum = 11 - pj;
  }

  return retNum;
}

type Options = {
  checkCode?: boolean;
};

/**
 * 检测值是否为营业执照号，也叫工商注册号。由14位数字本体码和1位数字校验码组成，其中本体码从左至右依次为：6位首次登记机关码、8位顺序码。
 *
 * @static
 * @alias module:Validator.isBusinessLicense
 * @since 3.5.0
 * @see {@link https://wenku.baidu.com/view/19873704cc1755270722087c.html GS15—2006 工商行政管理市场主体注册号编制规则}
 * @param {*} value 要检测的值
 * @param {Object} [options] 配置项
 * @param {boolean} [options.checkCode=true] 是否校验最后一位校验码，如果为false，不校验校验位。
 * @returns {boolean} 值是否为营业执照号
 * @example
 *
 * isBusinessLicense('310115600985533'); // true
 * isBusinessLicense('310115600985535'); // false
 *
 * // 不校验验证码，长度和类型还是有校验
 * isBusinessLicense('310115600985535', { checkCode: false }); // true
 * isBusinessLicense('ac115600985535', { checkCode: false }); // false
 * isBusinessLicense('31011560098', { checkCode: false }); // false
 *
 */
function isBusinessLicense(value: any, options: Options = {}) {
  const valueStr = toString(value);
  const { checkCode: needCheckCode = true } = options;

  const passBaseRule = baseReg.test(valueStr);

  // 宽松模式 或 基础规则不通过直接返回
  if (!needCheckCode || !passBaseRule) {
    return passBaseRule;
  }

  // 前14位
  const preCode = valueStr.substring(0, 14);
  // 校验码
  const lastCode = valueStr.substring(valueStr.length - 1);
  // 计算校验码
  const checkCode = sumCheckCode(preCode);

  return lastCode === String(checkCode);
}

export default isBusinessLicense;
