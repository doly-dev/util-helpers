import check from './check'

/**
 * 检测值是否为url
 * 
 * @private
 * @alias module:validator.isUrl
 * @since 1.1.0
 * @param {String} value 要检测的值
 * @returns {Boolean} 值是否为url
 * @example
 * 
 * import { isUrl } from "util-helpers";
 * 
 * isUrl('www.99bill.com');
 * // => true
 *
 * isUrl('99bill.com');
 * // => true
 *
 * isUrl('http://www.99bill.com/');
 * // => true
 *
 * isUrl('http://www.99bill.com:8080/');
 * // => true
 * 
 */
function isUrl(value) {
    return check(value, 'url');
}

export default isUrl;