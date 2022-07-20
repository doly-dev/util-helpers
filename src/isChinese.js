import normalizeString from './normalizeString';

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
  chineseExtendF: '[\u{2CEB0}-\u{2EBE0}]'
};

const looseChineseRegExp = chineseDictionary.chineseBasic + '+';
const chineseRegExp = '^' + chineseDictionary.chineseBasic + '+$';

const chineseWithExtend = '(?:' + chineseDictionary.chineseBasic + '|' + chineseDictionary.chineseExtend + '|' + chineseDictionary.chineseExtendA + '|' + chineseDictionary.chineseExtendB + '|' + chineseDictionary.chineseExtendC + '|' + chineseDictionary.chineseExtendD + '|' + chineseDictionary.chineseExtendE + '|' + chineseDictionary.chineseExtendF + ')';
const looseChineseExtendRegExp = chineseWithExtend + '+';
const chineseExtendRegExp = '^' + chineseWithExtend + '+$';

// eslint-disable-next-line no-prototype-builtins
const supportRegExpUnicode = RegExp.prototype.hasOwnProperty('unicode');

/**
 * 检测值是否为中文
 *
 * @static
 * @alias module:Validator.isChinese
 * @since 1.1.0
 * @see 参考 {@link http://www.unicode.org/reports/tr38/#BlockListing|4.4 Listing of Characters Covered by the Unihan Database}
 * @param {*} value 要检测的值
 * @param {Object} [options] 配置项
 * @param {boolean} [options.loose=false] 宽松模式。如果为true，只要包含中文即为true
 * @param {boolean} [options.useExtend=false] 使用统一表意文字扩展A-F。注意：如果不支持 `RegExp.prototype.unicode`，扩展字符集将自动不生效，如IE浏览器。
 * @returns {boolean} 值是否为中文
 * @example
 *
 * isChinese('林某某');
 * // => true
 *
 * isChinese('林A');
 * // => false
 *
 * // 宽松模式，只要包含中文即为true
 * isChinese('林A', { loose: true });
 * // => true
 *
 * isChinese('A林A', { loose: true });
 * // => true
 *
 * isChinese('𠮷');
 * // => false
 *
 * // 使用中文扩展字符集，需要浏览器支持 RegExp.prototype.unicode 才生效。
 * isChinese('𠮷', { useExtend: true });
 * // => true
 * isChinese('𠮷aa', { useExtend: true, loose: true });
 * // => true
 */
function isChinese(value, { loose = false, useExtend = false } = {}) {
  const valueStr = normalizeString(value);
  const basicRegExp = loose ? looseChineseRegExp : chineseRegExp;
  const extendRegExp = loose ? looseChineseExtendRegExp : chineseExtendRegExp;

  const hasExtend = useExtend && supportRegExpUnicode;
  const resultRegExp = hasExtend ? extendRegExp : basicRegExp;
  const flag = hasExtend ? 'u' : undefined;
  const reg = new RegExp(resultRegExp, flag);
  return reg.test(valueStr);
}

export default isChinese;
