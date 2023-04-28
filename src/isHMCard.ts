import normalizeString from './normalizeString';

// 港澳居民来往内地通行证正则
const regHMCard = /^[hm]{1}([0-9]{10}|[0-9]{8})$/i;

/**
 * 检测值是否为港澳居民来往内地通行证，俗称回乡证或回乡卡。
 *
 * @static
 * @alias module:Validator.isHMCard
 * @since 4.0.0
 * @see {@link https://zh.wikipedia.org/wiki/港澳居民来往内地通行证 | 港澳居民来往内地通行证}
 * @param {*} value 要检测的值
 * @returns {boolean} 是否为港澳居民来往内地通行证
 * @example
 * // 第一代 11 位
 * isHMCard('h3203117707'); // true
 * isHMCard('H3203117707'); // true
 * isHMCard('m3203117707'); // true
 * isHMCard('M3203117707'); // true
 *
 * // 第二代 9 位
 * isHMCard('h32031177'); // true
 * isHMCard('H32031177'); // true
 * isHMCard('m32031177'); // true
 * isHMCard('M32031177'); // true
 */
function isHMCard(value: any) {
  const valueStr = normalizeString(value);
  return regHMCard.test(valueStr);
}

export default isHMCard;
