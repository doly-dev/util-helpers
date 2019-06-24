import check from './check'

/**
 * 检测值是否为银行卡号
 * 
 * @module validator/isBankCard
 * @since 1.1.0
 * @param {String} value 要检测的值
 * @returns {Boolean} 值是否为ipv4
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
    return check(value, 'bankCard');
}

export default isBankCard;