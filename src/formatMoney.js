import { checkBoundary, scientificToNumber } from './utils/math.util';
import isNaN from './utils/type/isNaN';

// 检查数字或数字字符串
function checkNumber(num) {
  if (
    isNaN(num) ||
    (typeof num !== 'number' && typeof num !== 'string') ||
    num === '' ||
    typeof Number(num) !== 'number' ||
    num === Infinity || 
    num === -Infinity
  ) {
    console.error(`${num} invalid parameter.`);
    return false;
  }

  // 数字超限如果不是是字符串，可能有异常
  // 如 1111111111111111111111 // => 1.1111111111111111e+21
  if (typeof num === 'number') {
    checkBoundary(num);
  }

  return true;
}

// 格式化整数部分
function formatInt(intStr, thousand) {
  let txt = '';
  intStr = intStr[0] === '+' ? intStr.substr(1) : intStr; // 去掉+符号
  const negativeSymbol = Number(intStr) < 0 ? '-' : '';
  const reArr = negativeSymbol ? intStr.substr(1).split('').reverse() : intStr.split('').reverse();

  for (let i = 0; i < reArr.length; i++) {
    txt += reArr[i] + ((i + 1) % 3 === 0 && i + 1 !== reArr.length ? thousand : '');
  }

  return negativeSymbol + txt.split('').reverse().join('');
}

// 格式化小数部分，如果使用 toFixed，超大额数字会自动被截断
function formatDec(decStr, precision, decimal){
  if(precision === 0){
    return '';
  }

  const zero = 0;
  let ret = '';
  
  if(decStr && Number(decStr) > 0){
    let tmpNum = parseFloat('0.' + decStr);
    ret = tmpNum.toFixed(precision).substr(2);
  }else{
    ret = zero.toFixed(precision).substr(2);
  }

  return decimal + ret;
}

/**
 * 格式化金额
 *
 * @static
 * @alias module:Processor.formatMoney
 * @since 1.1.0
 * @param {String | Number} num 需转换金额 (最大：9007199254740991 最小： -9007199254740991)
 * @param {Object} [options] - 金额格式化配置
 * @param {String | Number} [options.precision=2] - 保留位数 （最高：10位）
 * @param {String} [options.symbol] - 货币符号
 * @param {String} [options.thousand=,] - 千分位符号
 * @param {String} [options.decimal=.] - 小数位符号
 * @returns {String} 格式化的金额
 * @example
 *
 * // 整数
 * formatMoney('1000');
 * // => 1,000.00
 *
 * // 小数（默认保留2位小数）
 * formatMoney('3000.03');
 * // => 3,000.03
 *
 * // 保留4位小数
 * formatMoney('3000.0300', { precision: 4 });
 * // => 3,000.0300
 *
 * // 保留10位小数
 * formatMoney('1500.2', { precision: 10 });
 * // => 1,500.2000000000
 *
 * // 自定义单位符号
 * formatMoney(1000.00, { symbol: '$' });
 * // => $1,000.00
 *
 * // 自定义千位分割符（默认','）
 * formatMoney(1000.00, { thousand: '|' });
 * // => 1|000.00
 *
 * // 自定义小数位分割符(默认'.')
 * formatMoney(1000.00, { thousand: '&' });
 * // => 1,000&00
 */
const formatMoney = (num, { precision = 2, symbol, thousand = ',', decimal = '.' } = {}) => {
  // 数字参数不正确，返回空字符串
  if (!checkNumber(num)) {
    return '';
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

  // 转换数字字符串，支持科学记数法
  const numStr = scientificToNumber(num) + '';
  // 整数和小数部分
  const [intStr, decStr] = numStr.split('.');

  return symbol + formatInt(intStr, thousand) + formatDec(decStr, precision, decimal);
};

export default formatMoney;