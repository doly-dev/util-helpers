// 基础规则，由18位数字和大写字母组成，不使用I、O、Z、S、V。
const baseReg = /^[\dA-HJ-NPQRTUWXY]{2}\d{6}[\dA-HJ-NPQRTUWXY]{10}/;

// 基础字符组成
const baseCodeArr = '0123456789ABCDEFGHJKLMNPQRTUWXY'.split('');

//加权因子
const weightFactor = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28];

/**
 * 获取字符位置
 * 
 * @private
 * @param {String} code 字符
 * @returns {Number} 字符所在基础字符的位置
 */
function getBaseCodeIndex(code) {
    return baseCodeArr.findIndex(item => item === code);
}

/**
 * 计算校验码
 * 
 * @private
 * @since 1.1.0
 * @param {String} preCode 统一代码前17位
 * @returns {String} 校验码
 */
function sumCheckCode(preCode) {
    const preCodeArr = preCode.split('');

    let total = 0;

    // 计算字符位置对应序号和加权因子的乘积，总和
    for (let i = 0; i < 17; i++) {
        // 字符位置对应的基础编码序号
        const index = getBaseCodeIndex(preCode[i]);
        // 加权因子
        const wf = weightFactor[i];
        // 计算序号和加权因子的乘积，并计算级数之和
        total += index * wf;
    }

    // 计算整数求余函数MOD
    const remainder = total % 31;
    // 校验码字符值序号
    const checkCodeIndex = 31 - remainder;

    return baseCodeArr[checkCodeIndex];
}

/**
 * 检测值是否为统一社会信用代码
 * 
 * @module validator/isSocialCreditCode
 * @see {@link https://zh.wikisource.org/zh-hans/GB_32100-2015_法人和其他组织统一社会信用代码编码规则|GB 32100-2015 法人和其他组织统一社会信用代码编码规则}
 * @since 1.1.0
 * @param {String} value 要检测的值
 * @param {Object} [options] 配置项
 * @param {Boolean} [options.loose=false] 宽松模式。如果为true，不校验校验位。
 * @returns {Boolean} 值是否为统一社会信用代码
 * @example
 * 
 * isSocialCreditCode('91350100M000100Y4A3');
 * // => true
 *
 * isSocialCreditCode('91350100M000100Y4AB');
 * // => false
 *
 * // 宽松模式，不校验校验位。所以也可以通过
 * isSocialCreditCode('91350100M000100Y4AB', {loose: true});
 * // => true
 * 
 */
function isSocialCreditCode(value, {
    loose = false
} = {}) {
    const passBaseRule = baseReg.test(value);

    if (!loose && passBaseRule) {
        // 前17位
        const preCode = value.substr(0, 17);
        // 校验码
        const lastCode = value.substr(-1);
        // 计算校验码
        const checkCode = sumCheckCode(preCode);

        return lastCode === checkCode;
    } else {
        return passBaseRule;
    }
}

export default isSocialCreditCode;