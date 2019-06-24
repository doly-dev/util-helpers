
/**
 * 检测值是否为中文
 * 
 * @module validator/isChinese
 * @since 1.1.0
 * @param {String} value 要检测的值
 * @param {Object} [options] 配置项
 * @param {Boolean} [options.loose=false] 宽松模式。如果为true，只要包含中文即为true
 * @returns {Boolean} 值是否为中文
 * @example
 * 
 * isChinese('林某某');
 * // => true
 *
 * isChinese('林A');
 * // => false
 *
 * // 宽松模式，只要包含中文即为true
 * isChinese('林A', {loose: true});
 * // => true
 * 
 */
function isChinese(value, {
    loose = false
} = {}) {
    const reg = new RegExp(`${loose ? '' : '^'}[\\u4e00-\\u9fa5]+${loose ? '' : '$'}`);

    return reg.test(value);
}

export default isChinese;