
/**
 * 检测值是否为中文
 * 
 * @module validator/isChinese
 * @see {@link http://www.unicode.org/reports/tr38/#CategoryListing}
 * @since 1.1.0
 * @param {String} value 要检测的值
 * @param {Object} [options] 配置项
 * @param {Boolean} [options.loose=false] 宽松模式。如果为true，只要包含中文即为true
 * @returns {Boolean} 值是否为中文
 * @example
 * 
 * isChinese('林某某');
 * // => true
 *
 * isChinese('林A');
 * // => false
 *
 * // 宽松模式，只要包含中文即为true
 * isChinese('林A', {loose: true});
 * // => true
 * 
 */
const chineseDictionary = {
  // 基本汉字
  chineseBasic: '[\u4e00-\u9fa5]',

  // 基本汉字补充

  chineseExtend: '[\u9ea6-\u9fef]',

  // 汉字扩展A

  chineseExtendA: '[\u3400-\u4DB5]',

  // 汉字扩展B

  chineseExtendB: '[\u{20000}-\u{2A6D6}]',

  // 汉字扩展C

  chineseExtendC: '[\u{2A700}-\u{2B734}]',

  // 汉字扩展D

  chineseExtendD: '[\u{2B740}-\u{2B81D}]',

  // 汉字扩展E

  chineseExtendE: '[\u{2B820}-\u{2CEA1}]',

  // 汉字扩展F

  chineseExtendF: '[\u{2CEB0}-\u{2EBE0}]',
};

let looseChineseRegExp = chineseDictionary.chineseBasic + '+';

let chineseRegExp = '^' + chineseDictionary.chineseBasic + '+$';

const supportRegExpUnicode = RegExp.prototype.hasOwnProperty('unicode');

if(supportRegExpUnicode){
  looseChineseRegExp = '(?:'+
                        chineseDictionary.chineseBasic + '|' +
                        chineseDictionary.chineseExtend + '|' +
                        chineseDictionary.chineseExtendA + '|' +
                        chineseDictionary.chineseExtendB + '|' +
                        chineseDictionary.chineseExtendC + '|' +
                        chineseDictionary.chineseExtendD + '|' +
                        chineseDictionary.chineseExtendE + '|' +
                        chineseDictionary.chineseExtendF + ')+';
  chineseRegExp = '^(?:'+
                    chineseDictionary.chineseBasic + '|' +
                    chineseDictionary.chineseExtend + '|' +
                    chineseDictionary.chineseExtendA + '|' +
                    chineseDictionary.chineseExtendB + '|' +
                    chineseDictionary.chineseExtendC + '|' +
                    chineseDictionary.chineseExtendD + '|' +
                    chineseDictionary.chineseExtendE + '|' +
                    chineseDictionary.chineseExtendF + ')+$';
}

function isChinese(value, {
    loose = false
} = {}) {
    const reg = new RegExp(loose ? looseChineseRegExp : chineseRegExp, supportRegExpUnicode ? 'u' : null);
    return reg.test(value);
}

export default isChinese;