// 手机号码正则
const reg = /^1[3456789]\d{9}$/;

/**
 * 检测值是否为11位有效手机号码
 * 规则 /^1[3456789]\d{9}$/
 * 说明 1开头，第二位是3456789其中一个，后面再加9个数字
 * 
 * @param { String | Number } value 手机号码
 * @returns { Boolean } 是否为11位有效手机号码
 * @example
 * 
 * const phoneNum = '13000000000';
 * 
 * isPhoneNumber(phoneNum);
 * // => true
 * 
 */
function isPhoneNumber(value){
    if(typeof value === 'number'){
        value = String(value);
    }

    if(typeof value !== 'string'){
        // console.error('TypeError: value type is a string or a number.');
        return false;
    }

    return reg.test(value);
}

export default isPhoneNumber;