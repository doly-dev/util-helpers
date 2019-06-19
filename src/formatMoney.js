const reg = /^[+-]?\d*\.?\d*$/;

const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;

const MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER || -9007199254740991;

/**
 * 金额格式转换
 * 说明 将金额格式化输出
 *
 * @since 1.1.0
 * @param {String | Number} num 需转换金额 (最大：9007199254740991 最小： -9007199254740991 )
 * @param { Object } options - 金额格式化配置
 * @param {String | Number} options.precision - 保留位数 （最高：10位）
 * @param { String } options.symbol - 货币符号
 * @param { String } [options.thousand=,] - 千分位符号
 * @param { String } [options.decimal=.] - 小数位符号
 * @returns { String }
 * @example
 *
 * const amount = '1000';
 *
 * formatMoney(amount);
 * // => 1000.00
 *
 */
const formatMoney = (num, { precision, symbol, thousand = ',', decimal = '.' } = {} ) => {
  if(!reg.test(num) || num === '' || !((typeof num) === 'string' ||  (typeof num) === 'number')) {
    return '';
  }
  if(+num > MAX_SAFE_INTEGER || +num < MIN_SAFE_INTEGER ) {
    return '';
  }
  if(!precision || !((typeof precision) === 'string' ||  (typeof precision) === 'number')) {
    precision = 2;
  } else {
    if(precision <= 0) {
      precision = 2;
    }

    if(precision >= 10) {
      precision = 10;
    }
  }

  num = parseFloat((num + '').replace(/[^\d\.-]/g, '')).toFixed(precision) + '';
  const reArr = num.split('.')[0].split('').reverse();
  let dot = num.split('.')[1];
  dot = dot === null ? '' : (typeof decimal=== 'string' ?  decimal: '.') + dot;
  let txt = '';
  let res = '';
  if (reArr[reArr.length - 1] === '-') {
    for (let i = 0; i < reArr.length; i++) {
      if (reArr[i]==='-') {
        txt += reArr[i]+'';
        continue;
      }
      txt += reArr[i] + ((i + 1) % 3 === 0 && i + 1 !== reArr.length-1 ? (typeof thousand === 'string' ? thousand : ',') : '');
    }
  } else {
    for (let i = 0; i < reArr.length; i++) {
      txt += reArr[i] + ((i + 1) % 3 === 0 && i + 1 !== reArr.length ? (typeof thousand === 'string' ? thousand : ',') : '');
    }
  }

  if(symbol && (typeof symbol) === 'string') {
    res = ( symbol + txt.split('').reverse().join('') + dot);
  } else {
    res = (txt.split('').reverse().join('') + dot);
  }

  return res;
};

export default formatMoney;