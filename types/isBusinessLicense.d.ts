export default isBusinessLicense;
/**
 * 检测值是否为营业执照号，也叫工商注册号。由14位数字本体码和1位数字校验码组成，其中本体码从左至右依次为：6位首次登记机关码、8位顺序码。
 *
 * @static
 * @alias module:Validator.isBusinessLicense
 * @see 参考 {@link https://wenku.baidu.com/view/19873704cc1755270722087c.html|GS15—2006 工商行政管理市场主体注册号编制规则}
 * @since 3.5.0
 * @param {string} value 要检测的值
 * @param {Object} [options] 配置项
 * @param {boolean} [options.loose=false] 宽松模式。如果为true，不校验校验位。
 * @returns {boolean} 值是否为营业执照号
 * @example
 *
 * isBusinessLicense('310115600985533');
 * // => true
 *
 * isBusinessLicense('3101156009');
 * // => false
 *
 * isBusinessLicense('3101156009', { loose: true });
 * // => false
 *
 * isBusinessLicense('310115600985535');
 * // => false
 *
 * isBusinessLicense('310115600985535', { loose: true });
 * // => true
 */
declare function isBusinessLicense(value: string, { loose }?: {
    loose?: boolean | undefined;
} | undefined): boolean;
