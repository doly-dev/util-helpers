import { toString } from 'ut2';
import { nativeUndefined, objectValues } from './utils/native';

const chineseDictionary = {
  // 基本汉字
  chineseBasic: '[\u4e00-\u9fa5]',

  // 基本汉字补充
  chineseExtend: '[\u9ea6-\u9fff]',

  // 兼容性表意文字
  chineseExtend2: '[\uF900-\uFAD9]',

  // 汉字扩展A
  chineseExtendA: '[\u3400-\u4DBF]',

  // 汉字扩展B
  chineseExtendB: '[\u{20000}-\u{2A6DF}]',

  // 汉字扩展C
  chineseExtendC: '[\u{2A700}-\u{2B738}]',

  // 汉字扩展D
  chineseExtendD: '[\u{2B740}-\u{2B81D}]',

  // 汉字扩展E
  chineseExtendE: '[\u{2B820}-\u{2CEA1}]',

  // 汉字扩展F
  chineseExtendF: '[\u{2CEB0}-\u{2EBE0}]',

  // 汉字扩展G
  chineseExtendG: '[\u{30000}-\u{3134A}]',

  // 汉字扩展H
  chineseExtendH: '[\u{31350}-\u{323AF}]',

  // 汉字扩展I
  chineseExtendI: '[\u{2EBF0}-\u{2EE5D}]'
};

const looseChineseRegExp = chineseDictionary.chineseBasic + '+';
const chineseRegExp = '^' + chineseDictionary.chineseBasic + '+$';

const chineseWithExtend = '(?:' + objectValues(chineseDictionary).join('|') + ')';
const looseChineseExtendRegExp = chineseWithExtend + '+';
const chineseExtendRegExp = '^' + chineseWithExtend + '+$';

// eslint-disable-next-line no-prototype-builtins
const supportRegExpUnicode = RegExp.prototype.hasOwnProperty('unicode');

type Options = {
  loose?: boolean;
  useExtend?: boolean;
};

/**
 * 检测值是否为中文
 *
 * @alias module:Validator.isChinese
 * @since 1.1.0
 * @see {@link http://www.unicode.org/reports/tr38/#BlockListing | 4.4 Listing of Characters Covered by the Unihan Database}
 * @see {@link https://zh.wikipedia.org/wiki/Unicode字符平面映射 | Unicode字符平面映射}
 * @see {@link https://zh.wikipedia.org/wiki/Unicode區段 | Unicode区段}
 * @param {*} value 要检测的值
 * @param {Object} [options] 配置项
 * @param {boolean} [options.loose=false] 宽松模式，默认`false`。如果为`true`，只要包含中文就返回`true`
 * @param {boolean} [options.useExtend=false] 使用统一表意文字扩展A-I，默认`false`。注意：如果不支持 `RegExp.prototype.unicode`，扩展字符集将自动不生效，如IE浏览器。
 * @returns {boolean} 值是否为中文
 * @example
 *
 * isChinese('林某某'); // true
 * isChinese('林A'); // false
 *
 * // 宽松模式，只要包含中文即为true
 * isChinese('林A', { loose: true }); // true
 * isChinese('A林A', { loose: true }); // true
 *
 * // 扩展字符集的字符
 * isChinese('𠮷'); // false
 *
 * // 使用中文扩展字符集，需要浏览器支持 RegExp.prototype.unicode 才生效。
 * isChinese('𠮷', { useExtend: true }); // true
 * isChinese('𠮷aa', { useExtend: true, loose: true }); // true
 *
 */
function isChinese(value: any, options: Options = {}) {
  const { loose = false, useExtend = false } = options;

  const valueStr = toString(value);
  const basicRegExp = loose ? looseChineseRegExp : chineseRegExp;
  const extendRegExp = loose ? looseChineseExtendRegExp : chineseExtendRegExp;

  const hasExtend = useExtend && supportRegExpUnicode;
  const resultRegExp = hasExtend ? extendRegExp : basicRegExp;
  const flag = hasExtend ? 'u' : nativeUndefined;
  const reg = new RegExp(resultRegExp, flag);
  return reg.test(valueStr);
}

export default isChinese;
