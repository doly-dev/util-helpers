/**
 * 格式化银行卡号
 * 
 * @static
 * @alias module:Processor.formatBankCard
 * @since 1.1.0
 * @param {string} bankCardNo 要处理的字符串
 * @param {Object} [options] 配置项
 * @param {string} [options.char=" "] 间隔字符
 * @param {number} [options.length=4] 间隔长度
 * @returns {string} 格式化的银行卡号
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
 * // 脱敏银行卡
 * formatBankCard('6228********890');
 * // => 6228 **** **** 890
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
  const reg = new RegExp(`(.{${length}})`, 'g');
  const regChar = new RegExp(`${char}`, 'g');

  const realValue = bankCardNo.replace(regChar, '');

  const needRemoveLastChar = realValue.length % length === 0;

  const str = realValue.replace(reg, `$1${char}`);

  return needRemoveLastChar ? str.substr(0, str.length - 1) : str;
}

export default formatBankCard;