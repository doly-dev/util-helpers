// 18位身份证
const regIdCard18 = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[012]))(([0-2][1-9])|10|20|30|31)\d{3}(\d|X)$/i;

// 15位身份证
const regIdCard15 = /^[1-9]\d{5}\d{2}((0[1-9])|(1[012]))(([0-2][1-9])|10|20|30|31)\d{3}$/;

/**
 * 检测值是否为身份证号
 * 
 * @static
 * @alias module:Validator.isIdCard
 * @since 1.1.0
 * @param {String} value 要检测的值
 * @returns {Boolean} 值是否为身份证号
 * @example
 *
 * isIdCard('320311770706001');
 * // => true
 *
 * isIdCard('130701199310302288');
 * // => true
 *
 * isIdCard('130701199310');
 * // => false
 * 
 */
function isIdCard(value) {
  return regIdCard18.test(value) || regIdCard15.test(value);
}

export default isIdCard;