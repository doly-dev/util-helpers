import convertToString from './utils/convertToString';

// 台湾居民来往大陆通行证正则，支持一次性短期台胞证
const regTWCard = /^(\d{8}|[\da-z]{10})$/i;

/**
 * 检测值是否为台湾居民来往大陆通行证，俗称台胞证。
 *
 * @static
 * @alias module:Validator.isTWCard
 * @since 4.0.0
 * @see 参考 {@link https://zh.wikipedia.org/wiki/台湾居民来往大陆通行证|台湾居民来往大陆通行证}
 * @param {*} value 要检测的值
 * @returns {boolean} 是否为台湾居民来往大陆通行证
 * @example
 * isTWCard('12345678') // true
 * isTWCard('07257456') // true
 *
 * // 一次性短期
 * isTWCard('F290299977') // true
 */
function isTWCard(value) {
  const valueStr = convertToString(value);
  return regTWCard.test(valueStr);
}

export default isTWCard;
