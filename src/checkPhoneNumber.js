// 手机号码正则
const reg = /^1[3456789]\d{9}$/;

/**
 * 校验手机号码
 * 规则 /^1[3456789]\d{9}$/
 * 说明 1开头，第二位是3456789其中一个，后面再加9个数字
 * 
 * @param { String | Number } phoneNumber 手机号码
 * @returns { Boolean } 是否正确的手机号码
 * @example
 * 
 * const phoneNumber = '13000000000';
 * 
 * checkPhoneNumber(phoneNumber);
 * // => true
 * 
 */
function checkPhoneNumber(phoneNumber){
    if(typeof phoneNumber === 'number'){
        phoneNumber = String(phoneNumber);
    }

    if(typeof phoneNumber !== 'string'){
        // console.error('TypeError: phoneNumber type is a string or a number.');
        return false;
    }

    return reg.test(phoneNumber);
}

export default checkPhoneNumber;