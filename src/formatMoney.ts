import { isNaN, isNumber, isString } from 'ut2';
import { checkBoundary, transformEffectiveNumber, trimLeftZero } from './utils/math.util';
import devWarn from './utils/devWarn';
import isValidNumber from './isValidNumber';

/**
 * 检查数字或数字字符串
 *
 * @private
 * @param {string|number} [num]
 * @returns 是否为数字
 */
function checkNumber(num?: string | number) {
  if (!isValidNumber(num)) {
    devWarn(`${num} invalid parameter.`);
    return false;
  }

  // 数字超限如果不是是字符串，可能有异常
  // 如 1111111111111111111111 // => 1.1111111111111111e+21
  if (typeof num === 'number') {
    checkBoundary(num);
  }

  return true;
}

/**
 * 格式化整数部分
 *
 * @private
 * @param {string} intStr 数字字符串
 * @param {string} thousand 千分位符号
 * @returns 格式化后的值
 */
function formatInt(intStr: string, thousand: string) {
  let txt = '';
  intStr = trimLeftZero(intStr);
  intStr = intStr[0] === '+' ? intStr.substring(1) : intStr; // 去掉+符号
  const negativeSymbol = Number(intStr) < 0 ? '-' : '';
  const reArr = negativeSymbol ? intStr.substring(1).split('').reverse() : intStr.split('').reverse();

  for (let i = 0; i < reArr.length; i++) {
    txt += reArr[i] + ((i + 1) % 3 === 0 && i + 1 !== reArr.length ? thousand : '');
  }

  return negativeSymbol + txt.split('').reverse().join('');
}

/**
 * 格式化小数部分，如果使用 toFixed，超大额数字会自动被截断
 *
 * @private
 * @param {string} decStr 小数点部分的字符串
 * @param {number} precision 保留位数
 * @param {string} decimal 小数点符号
 * @returns 格式化后的值
 */
function formatDec(decStr: string, precision: number, decimal: string) {
  if (precision === 0) {
    return '';
  }

  const zero = 0;
  let ret = '';

  if (decStr && Number(decStr) > 0) {
    const tmpNum = parseFloat('0.' + decStr);
    ret = tmpNum.toFixed(precision).substring(2);
  } else {
    ret = zero.toFixed(precision).substring(2);
  }

  return decimal + ret;
}

type Options = {
  precision?: number;
  symbol?: string;
  thousand?: string;
  decimal?: string;
  strict?: boolean;
};

/**
 * 格式化金额
 *
 * @alias module:Processor.formatMoney
 * @since 1.1.0
 * @param {string | number} num 需转换金额 (最大：9007199254740991 最小： -9007199254740991)
 * @param {Object} [options] 金额格式化配置
 * @param {number} [options.precision=2] 保留位数，默认`2`。最高`10`。
 * @param {string} [options.symbol] 货币符号
 * @param {string} [options.thousand=","] 千分位符号， 默认`,`
 * @param {string} [options.decimal="."] 小数位符号，默认`.`
 * @param {boolean} [options.strict=ture] 严格模式，默认`true`。开启后，只支持非空字符串和数字格式化，其他类型值如`null` `undefined` `true` `false`等将返回空字符串。
 * @returns {string} 格式化的金额
 * @example
 *
 * // 整数
 * formatMoney(1000); // 1,000.00
 *
 * // 小数（默认保留2位小数）
 * formatMoney(3000.03); // 3,000.03
 *
 * // 保留4位小数
 * formatMoney(3000.03, { precision: 4 }); // 3,000.0300
 *
 * // 保留10位小数
 * formatMoney(1500.2, { precision: 10 }); // 1,500.2000000000
 *
 * // 自定义单位符号
 * formatMoney(1000.00, { symbol: '$' }); // $1,000.00
 *
 * // 自定义千位分割符（默认','）
 * formatMoney(1000.00, { thousand: '|' }); // 1|000.00
 *
 * // 自定义小数位分割符(默认'.')
 * formatMoney(1000.00, { decimal: '&' }); // 1,000&00
 *
 * // 字符串数字
 * formatMoney('3000.03', { precision: 4 }); // 3,000.0300
 */
const formatMoney = (num?: string | number, options: Options = {}) => {
  let {
    precision = 2,
    symbol,
    thousand = ',',
    decimal = '.',
    // eslint-disable-next-line prefer-const
    strict = true
  } = options;

  // 数字参数不正确，返回空字符串
  if (!checkNumber(num) || (strict && (!isString(num) || num === '') && !isNumber(num))) {
    return '';
  }

  if (typeof num === 'number' && !isFinite(num)) {
    return num + '';
  }

  // 参数规整化
  if (typeof precision !== 'number' || isNaN(precision) || precision < 0) {
    precision = 2;
  } else if (precision > 10) {
    precision = 10;
  }
  symbol = typeof symbol === 'string' ? symbol : '';
  thousand = typeof thousand === 'string' ? thousand : ',';
  decimal = typeof decimal === 'string' ? decimal : '.';

  // 转换数字字符串
  const strNum = transformEffectiveNumber(num) + '';
  // 整数和小数部分
  const [intStr, decStr] = strNum.split('.');

  return symbol + formatInt(intStr, thousand) + formatDec(decStr, precision, decimal);
};

export default formatMoney;
