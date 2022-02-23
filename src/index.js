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

/**
 * 数学计算，修正浮点数计算问题
 *
 * @module Math
 * @since 3.1.0
 * @see 参考 {@link https://github.com/camsong/blog/issues/9|JavaScript 浮点数陷阱及解法}
 * @see 参考 {@link https://2zbuy.csb.app/|JS浮点数计算测试}
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

/**
 * 调试相关
 *
 * @module Debug
 * @ignore
 * @since 3.6.1
 */
export { setDisableWarning } from './utils/config';
