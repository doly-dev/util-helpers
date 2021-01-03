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

/**
 * 数学计算，修正浮点数计算问题
 * 
 * @module Math
 * @since 3.1.0
 * @see {@link https://github.com/camsong/blog/issues/9|JavaScript 浮点数陷阱及解法}
 * @see {@link https://2zbuy.csb.app/|JS浮点数计算测试}
 */
export { default as plus } from './plus';
export { default as minus } from './minus';
export { default as times } from './times';
export { default as divide } from './divide';
export { default as round } from './round';

/**
 * 调试相关
 * 
 * @module Debug
 * @since 3.6.1
 */
export { setDisableWarning } from './utils/config';