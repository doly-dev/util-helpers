/**
 * 数据验证
 *
 * @module Validator
 * @since 1.1.0
 */
export { default as isMobile } from './isMobile';
export { default as isTelephone } from './isTelephone';
export { default as isPostcode } from './isPostcode';
export { default as isIdCard } from './isIdCard';
export { default as isEmail } from './isEmail';
export { default as isQQ } from './isQQ';
export { default as isWX } from './isWX';
export { default as isVehicle } from './isVehicle';
export { default as isBankCard } from './isBankCard';
export { default as isSocialCreditCode } from './isSocialCreditCode';
export { default as isPassword } from './isPassword';
export { default as isPassport } from './isPassport';
export { default as isChinese } from './isChinese';
export { default as isIPv4 } from './isIPv4';
export { default as isIPv6 } from './isIPv6';
export { default as isUrl } from './isUrl';
export { default as isBusinessLicense } from './isBusinessLicense';
export { default as validatePassword } from './validatePassword';
export { default as isPromiseLike } from './isPromiseLike';
export { default as isHMCard } from './isHMCard';
export { default as isTWCard } from './isTWCard';
export { default as isSwiftCode } from './isSwiftCode';

/**
 * 数据处理
 *
 * @module Processor
 * @since 1.1.0
 */
export { default as formatMoney } from './formatMoney';
export { default as formatBankCard } from './formatBankCard';
export { default as replaceChar } from './replaceChar';
export { default as numberToChinese } from './numberToChinese';
export { default as bytesToSize } from './bytesToSize';
export { default as parseIdCard } from './parseIdCard';
export { default as blobToDataURL } from './blobToDataURL';
export { default as dataURLToBlob } from './dataURLToBlob';
export { default as setDataURLPrefix } from './setDataURLPrefix';
export { default as normalizeString } from './normalizeString';
export { default as safeDate } from './safeDate';
export { default as formatMobile } from './formatMobile';
export { default as padZero } from './padZero';

/**
 * 数学计算，修正浮点数计算问题
 *
 * @module Math
 * @since 3.1.0
 * @see 参考 {@link https://github.com/camsong/blog/issues/9|JavaScript 浮点数陷阱及解法}
 * @see 参考 {@link https://2zbuy.csb.app/|JS浮点数计算测试}
 * @example
 * // 从 4.12.0 版本开始，规范了有效数值参数校验。有效数值即数字或字符串类型，能通过 Number(value) 转为数字，且不为 NaN 、空字符串、空格字符串。
 * 
 * // 以下为有效数值：
 * // 1. 数字: 1, -1, 1e-2, 1.312, 0.1, Infinity
 * // 2. 数字字符串: '1', '10e2', '-1', '0.1'
 * 
 * // 以下为无效数值：
 * // 1. 非数字的字符串: '', ' ', '1a', '-12a', '10.2.2', '10e2.1'
 * // 2. 其他类型值: undefined, null, true, false, [], {}, new Date(), ...
 * 
 * // *注意：Number('') 、 Number(' ') 、 Number(new Date) 、 Number(true)等等是可以返回数字，但都不是有效数值。因为它们分别是空字符串、空格字符串和非数字或字符串类型。
 * 
 * 
 * // 计算说明：
 * // 1. 全部参数都是无效数值将返回 NaN 。
 * plus(); // NaN
 * plus(new Date()); // NaN
 * plus(true, null); // NaN
 * 
 * // 2. 参数中包含有效数值和无效数值，将忽略无效数值。
 * plus(0.1); // 0.1
 * plus('0.1', ' ', true, ); // 0.1
 * plus(true, 0.1); // 0.1
 * plus(true, 0.1, 0.2); // 0.3
 * plus('', 0.1, ' ', new Date(), 0.2); // 0.3
 * plus(0.1, true, 0.2, null); // 0.3
 * 
 * // 3. 数字和数字字符串将正常的使用安全计算
 * plus(0.1, 0.2); // 0.3
 * plus(0.1, 0.2, 0.3); // 0.6
 * 
 */
export { default as plus } from './plus';
export { default as minus } from './minus';
export { default as times } from './times';
export { default as divide } from './divide';
export { default as round } from './round';

/**
 * 其他
 *
 * @module Other
 * @since 4.2.0
 */
export { default as waitTime } from './waitTime';
export { default as calculateCursorPosition } from './calculateCursorPosition';
export { default as randomString } from './randomString';
export { default as strlen } from './strlen';

/**
 * 调试相关
 *
 * @module Debug
 * @ignore
 * @since 3.6.1
 */
export { setDisableWarning } from './utils/config';
