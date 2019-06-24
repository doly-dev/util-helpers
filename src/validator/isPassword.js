
/**
 * 检测值是否符合密码强度
 * 注意该校验只校验是否存在不同字符(大小写字母、数字、特殊符号)，不判断长度
 * 
 * @module validator/isPassword
 * @since 1.1.0
 * @param {String} value 要检测的值
 * @param {Object} [options] 配置项
 * @param {Number} [options.level=2] 密码强度 1-包含一种字符 2-包含两种字符 3-包含三种字符。（大写字母、小写字母、数字、其他字符）
 * @param {Boolean} [options.ignoreCase=false] 忽略大小写，即大小写字母视为一种字符
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
 * isPassword(' _Aa12345678', {level: 3, ignoreCase: true});
 * // => true
 * 
 */
function isPassword(value, {
    level = 2,
    ignoreCase = false
} = {}) {
    if (level === 1) {
        return /^.+$/.test(value);
    } else if (level === 2) {
        if (ignoreCase) {
            return /^((\d+\D)|(\D+\d)|([a-z]+[^a-z])|([^a-z\d]+[a-z\d])).*$/i.test(value);
        } else {
            return /^((\d+\D)|(\D+\d)|([a-z]+[^a-z])|([A-Z]+[^A-Z])|([^a-zA-Z\d]+[a-zA-Z\d])).*$/.test(value);
        }
    } else if (level === 3) {
        if (ignoreCase) {
            return /^((\d+[a-z]+[^\da-z])|(\d+[^\da-z]+[a-z])|([a-z]+\d+[^\da-z])|([a-z]+[^\da-z]+\d)|([^a-z\d]+\d+[a-z])|([^a-z\d]+[a-z]+\d)).*$/i.test(value);
        } else {
            return /^((\d+[a-z]+[^\da-z])|(\d+[A-Z]+[^\dA-Z])|(\d+[^\da-zA-Z]+[a-zA-Z])|([a-z]+\d+[^\da-z])|([a-z]+[A-Z]+[^a-zA-Z])|([a-z]+[^\da-zA-Z]+[\dA-Z])|([^a-zA-Z\d]+\d+[a-zA-Z])|([^a-zA-Z\d]+[a-z]+[\dA-Z])|([^a-zA-Z\d]+[A-Z]+[\da-z])|([A-Z]+\d+[^\dA-Z])|([A-Z]+[a-z]+[^a-zA-Z])|([A-Z]+[^\da-zA-Z]+[\da-z])).*$/.test(value);
        }
    } else {
        return false;
    }
}

export default isPassword;