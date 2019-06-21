// QQ号正则
// 5至11位数字
const reg = /^[1-9][0-9]{4,10}$/;

/**
 * 检测值是否为有效的QQ号
 * 
 * @since 1.1.0
 * @param {String|Number} value QQ号
 * @returns {Boolean} 是否为有效的QQ号
 * @example
 * 
 * isQQ('012345');
 * // => false
 *
 * isQQ('12345');
 * // => true
 *
 * isQQ(12345);
 * // => true
 * 
 */
function isQQ(value) {
    if (typeof value === 'number') {
        value = String(value);
    }

    if (typeof value !== 'string') {
        return false;
    }

    return reg.test(value);
}

export default isQQ;