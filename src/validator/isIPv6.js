import check from './check'

/**
 * 检测值是否为ipv6
 * 
 * @alias module:validator.isIPv6
 * @since 1.1.0
 * @param {String} value 要检测的值
 * @returns {Boolean} 值是否为ipv6
 * @example
 * 
 * import { isIPv6 } from "util-helpers";
 *
 * // 冒分十六进制表示法
 * isIPv6('2001:0DB8:0000:0023:0008:0800:200C:417A');
 * // => true
 *
 * // 前导0省略
 * isIPv6('2001:DB8:0:23:8:800:200C:417A');
 * // => true
 *
 * isIPv6('FF01:0:0:0:0:0:0:1101');
 * // => true
 *
 * // 0位压缩表示法
 * isIPv6('FF01::1101');
 *
 * isIPv6('0:0:0:0:0:0:0:1');
 * // => true
 *
 * // 0位压缩表示法
 * isIPv6('::1');
 *
 * isIPv6('0:0:0:0:0:0:0:0');
 * // => true
 *
 * // 0位压缩表示法
 * isIPv6('::');
 * // => true
 *
 * // 内嵌IPv4地址表示法
 * isIPv6('::192.168.1.1');
 * // => true
 * 
 * isIPv6('::FFFF:192.168.1.1');
 * // => true
 *
 * isIPv6('192.168.1.1');
 * // => false
 * 
 */
function isIPv6(value) {
    return check(value, 'ipv6');
}

export default isIPv6;