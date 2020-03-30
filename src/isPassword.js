
/**
 * 检测值是否符合密码强度
 * 注意该校验只校验是否存在不同字符(大小写字母、数字、特殊符号)，不判断长度
 * 
 * @static
 * @alias module:Validator.isPassword
 * @since 1.1.0
 * @param {String} value 要检测的值
 * @param {Object} [options] 配置项
 * @param {Number} [options.level=2] 密码强度 1-包含一种字符 2-包含两种字符 3-包含三种字符。（大写字母、小写字母、数字、特殊字符）
 * @param {Boolean} [options.ignoreCase=false] 忽略大小写，即大小写字母视为一种字符
 * @param {String} [options.special=-_!@#$%^&*] 特殊字符
 * @returns {Boolean} 值是否符合密码强度
 * @example
 * 
 * isPassword('a12345678');
 * // => true
 * 
 * isPassword('a12345678', {level: 3});
 * // => false
 * 
 * isPassword('Aa12345678', {level: 3});
 * // => true
 * 
 * isPassword('Aa12345678', {level: 3, ignoreCase: true});
 * // => false
 * 
 * isPassword('_Aa12345678', {level: 3, ignoreCase: true});
 * // => true
 * 
 * // 仅支持 数字、字母、特殊字符，其他字符如中文字符是校验不通过的
 * isPassword('_Aa一二三45678', {level: 3, ignoreCase: true});
 * // => false
 * 
 * isPassword(' _Aa12345678', {level: 3, ignoreCase: true});
 * // => false
 */
function isPassword(value, {
  level = 2,
  ignoreCase = false,
  special = "-_!@#$%^&*"
} = {}) {
  const numRegStr = "\\d";
  const lowercaseRegStr = "a-z";
  const uppercaseRegStr = "A-Z";
  const ignorecaseRegStr = "a-zA-Z";

  let reg = null;

  if (level === 1) {
    reg = new RegExp(`^(?:${numRegStr}+|[${ignorecaseRegStr}]+|[${special}]+)$/`);
  } else if (level === 2) {
    if (ignoreCase) {
      reg = new RegExp(`^(?![${ignorecaseRegStr}]+$)(?!${numRegStr}+$)(?![${special}]+$)[${ignorecaseRegStr}${numRegStr}${special}]+$`);
    } else {
      reg = new RegExp(`^(?![${lowercaseRegStr}]+$)(?![${uppercaseRegStr}]+$)(?!${numRegStr}+$)(?![${special}]+$)[${ignorecaseRegStr}${numRegStr}${special}]+$`);
    }
  } else if (level === 3) {
    if (ignoreCase) {
      // ^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$
      reg = new RegExp(`^(?![${ignorecaseRegStr}]+$)(?!${numRegStr}+$)(?![${special}]+$)(?![${ignorecaseRegStr}${numRegStr}]+$)(?![${ignorecaseRegStr}${special}]+$)(?![${numRegStr}${special}]+$)[${ignorecaseRegStr}${numRegStr}${special}]+$`);
    } else {
      reg = new RegExp(`^(?![${lowercaseRegStr}]+$)(?![${uppercaseRegStr}]+$)(?!${numRegStr}+$)(?![${special}]+$)(?![${lowercaseRegStr}${numRegStr}]+$)(?![${uppercaseRegStr}${numRegStr}]+$)(?![${lowercaseRegStr}${special}]+$)(?![${uppercaseRegStr}${special}]+$)(?![${numRegStr}${special}]+$)[${ignorecaseRegStr}${numRegStr}${special}]+$`);
    }
  }

  return reg ? reg.test(value) : false;
}

export default isPassword;