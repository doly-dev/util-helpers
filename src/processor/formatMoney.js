const reg = /^[+-]?\d*\.?\d*$/;

const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;

const MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER || -9007199254740991;

/**
 * 格式化金额
 *
 * @module
 * @since 1.1.0
 * @param {String | Number} num 需转换金额 (最大：9007199254740991 最小： -9007199254740991 )
 * @param { Object } [options] - 金额格式化配置
 * @param {String | Number} [options.precision] - 保留位数 （最高：10位）
 * @param { String } [options.symbol] - 货币符号
 * @param { String } [options.thousand=,] - 千分位符号
 * @param { String } [options.decimal=.] - 小数位符号
 * @returns { String } 格式化的金额
 * @example
 *
 * // 整数
 * formatMoney('1000');  // => 1,000.00
 *
 * // 小数（默认保留2位小数）
 * formatMoney('3000.03');  // => 3,000.03
 *
 * // 保留4位小数
 * formatMoney('3000.0300', { precision: 4 });  // => 3,000.03
 *
 * // 保留10位小数
 * formatMoney('1500.2', { precision: 10 });  // => 1,500.2000000000
 *
 * // 保留10位小数
 * formatMoney('1500.2');  // => 1,500.2000000000
 *
 * // 单位符号
 * formatMoney(1000.00, { symbol: '$' }); // => $1,000.00
 *
 * // 千位分割符
 * formatMoney(1000.00, { thousand: '|' }); // => 1|000.00
 *
 * // 小数位分割符
 * formatMoney(1000.00, { thousand: '&' }); // => 1,000&00
 *
 */
const formatMoney = (num, { precision, symbol, thousand = ',', decimal = '.' } = {}) => {
  if (!reg.test(num) || num === '' || !((typeof num) === 'string' || (typeof num) === 'number')) {
    return '';
  }
  if (+num > MAX_SAFE_INTEGER || +num < MIN_SAFE_INTEGER) {
    return '';
  }
  if (!precision || !((typeof precision) === 'string' || (typeof precision) === 'number')) {
    precision = 2;
  } else {
    if (precision <= 0) {
      precision = 2;
    }

    if (precision >= 10) {
      precision = 10;
    }
  }

  num = parseFloat((num + '').replace(/[^\d\.-]/g, '')).toFixed(precision) + '';
  const reArr = num.split('.')[0].split('').reverse();
  let dot = num.split('.')[1];
  dot = dot === null ? '' : (typeof decimal === 'string' ? decimal : '.') + dot;
  let txt = '';
  let res = '';
  if (reArr[reArr.length - 1] === '-') {
    for (let i = 0; i < reArr.length; i++) {
      if (reArr[i] === '-') {
        txt += reArr[i] + '';
        continue;
      }
      txt += reArr[i] + ((i + 1) % 3 === 0 && i + 1 !== reArr.length - 1 ? (typeof thousand === 'string' ? thousand : ',') : '');
    }
  } else {
    for (let i = 0; i < reArr.length; i++) {
      txt += reArr[i] + ((i + 1) % 3 === 0 && i + 1 !== reArr.length ? (typeof thousand === 'string' ? thousand : ',') : '');
    }
  }

  if (symbol && (typeof symbol) === 'string') {
    res = (symbol + txt.split('').reverse().join('') + dot);
  } else {
    res = (txt.split('').reverse().join('') + dot);
  }

  return res;
};

export default formatMoney;