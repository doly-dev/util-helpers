import normalizeString from './normalizeString';

// 台湾居民来往大陆通行证正则
const regTWCard = /^\d{8}$/i;

// 一次性短期台胞证
const singleRegTWCard = /^[\da-z]{10,12}$/i;

/**
 * 检测值是否为台湾居民来往大陆通行证，俗称台胞证。
 *
 * @static
 * @alias module:Validator.isTWCard
 * @since 4.0.0
 * @see {@link https://zh.wikipedia.org/wiki/台湾居民来往大陆通行证|台湾居民来往大陆通行证}
 * @param {*} value 要检测的值
 * @param {Object} [options] 配置项
 * @param {boolean} [options.loose=false] 宽松模式。如果为true，表示支持一次性短期通行证
 * @returns {boolean} 是否为台湾居民来往大陆通行证
 * @example
 * 
 * isTWCard('12345678'); // true
 * isTWCard('07257456'); // true
 *
 * // 一次性短期
 * isTWCard('F290299977'); // false
 * 
 * // 宽松模式，支持一次性短期通行证
 * isTWCard('F290299977', { loose: true }); // true
 */
function isTWCard(value, options = {}) {
  const { loose = false } = options;

  const valueStr = normalizeString(value);
  if (regTWCard.test(valueStr)) {
    return true;
  }
  return loose ? singleRegTWCard.test(valueStr) : false;
}

export default isTWCard;
