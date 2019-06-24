
/**
 * 格式化银行卡号
 * 
 * @module processor/formatBankCard
 * @since 1.1.0
 * @param {String} str 要处理的字符串
 * @param {Object} [options] 配置项
 * @param {Number} [options.char=' '] 间隔字符
 * @param {Number} [options.length=4] 间隔长度
 * @example
 *
 * // 19位银行卡
 * formatBankCard('6228480402564890018');
 * // => 6228 4804 0256 4890 018
 * 
 * // 16位银行卡
 * formatBankCard('6228480402564890');
 * // => 6228 4804 0256 4890
 * 
 * // 16位银行卡，"-"间隔
 * formatBankCard('6228480402564890', {char: '-'});
 * // => 6228-4804-0256-4890
 * 
 */
function formatBankCard(bankCardNo = '', {
    char = ' ',
    length = 4
} = {}) {
    const reg = new RegExp(`(\\d{${length}})`, 'g');

    const needRemoveLastChar = bankCardNo.length % length === 0;

    const str = bankCardNo.replace(reg, `$1${char}`);

    return needRemoveLastChar ? str.substr(0, str.length - 1) : str;
}

export default formatBankCard