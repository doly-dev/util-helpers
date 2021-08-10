import convertToString from './utils/convertToString';

// 港澳居民来往内地通行证正则
const regHMCard = /^[hm]{1}([0-9]{10}|[0-9]{8})$/i;

/**
 * 检测值是否为港澳居民来往内地通行证，俗称回乡证或回乡卡。
 *
 * @static
 * @alias module:Validator.isHMCard
 * @since 4.0.0
 * @see 参考 {@link https://zh.wikipedia.org/wiki/港澳居民来往内地通行证|港澳居民来往内地通行证}
 * @param {*} value 要检测的值
 * @returns {boolean} 是否为港澳居民来往内地通行证
 */
function isHMCard(value) {
  const valueStr = convertToString(value);
  return regHMCard.test(valueStr);
}

export default isHMCard;
