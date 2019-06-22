import isRegExp from '../type/isRegExp'
import builtInPattern from './builtInPattern'

/**
 * 检测值是否匹配正则模式
 * 
 * @private
 * @param {String} value 要检测的值
 * @param {String|RegExp} pattern 正则模式
 * @returns {Boolean} 值是否匹配正则模式
 */
function check(value, pattern) {
    if (typeof value !== 'string') {
        // console.error('TypeError: value must be a string.');
        return false;
    }

    if (!isRegExp(pattern) && typeof pattern === 'string') {
        pattern = builtInPattern[pattern];
    }

    if (!pattern) {
        // console.error('TypeError: pattern type is a string or regExp.');
        return false;
    }

    return pattern.test(value);
}

export default check