import { toString } from 'ut2';

// 身份证号正则
const regIdCard = /^[1-9]\d{5}(19|20)?\d{2}((0[1-9])|(1[012]))(([0-2][1-9])|10|20|30|31)\d{3}(\d|X)?$/i;

/**
 * 校验码计算
 *
 * @private
 * @param {string} id 身份证号码
 * @returns {boolean} 校验码是否正确
 */
function check(id: string) {
  let index, sum;
  for (sum = index = 0; index < 17; index++) {
    sum += (Math.pow(2, 17 - index) % 11) * Number(id[index]);
  }
  const num = (12 - (sum % 11)) % 11;
  if (num < 10) {
    return num === Number(id[17]);
  } else {
    return id[17].toUpperCase() === 'X';
  }
}

type Options = {
  loose?: boolean;
  checkCode?: boolean;
};

/**
 * 检测值是否为18位身份证号码。
 *
 * 宽松模式下，支持15位身份证号码。
 *
 * @static
 * @alias module:Validator.isIdCard
 * @since 1.1.0
 * @see {@link https://zh.wikipedia.org/wiki/中华人民共和国公民身份号码 | 中华人民共和国公民身份号码}
 * @see {@link https://baike.baidu.com/item/居民身份证号码 | 居民身份证号码}
 * @param {*} value 要检测的值
 * @param {Object} [options] 配置项
 * @param {boolean} [options.loose=false] 宽松模式，默认`false`。如果为`true`，支持15位身份证号码
 * @param {boolean} [options.checkCode=true] 是否校验最后一位校验码，默认`true`。仅在`loose=false`时生效
 * @returns {boolean} 值是否为身份证号
 * @example
 *
 * isIdCard('130701199310302288'); // true
 * isIdCard('13070119931030228X'); // false
 *
 * // 不校验校验码
 * isIdCard('13070119931030228X', { checkCode: false }); // true
 *
 * // 默认不支持15位身份证号码
 * isIdCard('320311770706001'); // false
 *
 * // 宽松模式，支持15位身份证号
 * isIdCard('320311770706001', { loose: true }); // true
 *
 */
function isIdCard(value: any, options: Options = {}) {
  const { loose = false, checkCode = true } = options;

  const valueStr = toString(value);
  if (valueStr.length === 15 && loose) {
    return regIdCard.test(valueStr);
  }

  if (valueStr.length === 18 && regIdCard.test(valueStr)) {
    if (checkCode) {
      return check(valueStr);
    }
    return true;
  }

  return false;
}

export default isIdCard;
