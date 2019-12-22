// 银行卡号正则 非0开头，15至19位数字
const reg = /^[1-9]\d{14,18}$/;

/**
 * 检测值是否为银行卡号
 * 
 * @static
 * @alias module:Validator.isBankCard
 * @since 1.1.0
 * @param {String} value 要检测的值
 * @returns {Boolean} 值是否为银行卡号
 * @example
 * 
 * isBankCard('6228480402564890018');
 * // => true
 *
 * isBankCard('6228480402564890');
 * // => true
 *
 * isBankCard('123456789');
 * // => false
 * 
 */
function isBankCard(value) {
    return reg.test(value);
}

export default isBankCard;