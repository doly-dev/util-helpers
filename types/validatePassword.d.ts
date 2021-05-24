export default validatePassword;
/**
 * 验证密码（数字、大小写字母、特殊字符、非法字符）
 *
 * @see 参考 {@link https://baike.baidu.com/item/ASCII#3|ASCII}
 * @static
 * @alias module:Validator.validatePassword
 * @since 3.7.0
 * @param {string} value 要检测的值
 * @param {Object} [options] 配置项
 * @param {number} [options.level=2] 密码强度 1-包含一种字符 2-包含两种字符 3-包含三种字符。（大写字母、小写字母、数字、特殊字符）
 * @param {boolean} [options.ignoreCase=false] 是否忽略大小写，为 ture 时，大小写字母视为一种字符
 * @param {string} [options.special="!@#$%^&*()-=_+[]\|{},./?<>~"] 支持的特殊字符
 * @returns 验证结果
 * @example
 *
 * validatePassword('a12345678');
 * // =>
 * {
 *   validated: true, // 验证结果，根据密码强度、是否包含非法字符得出
 *   level: 2, // 强度级别
 *   containes: {
 *     number: true, // 包含数字
 *     lowerCaseLetter: true, // 包含小写字母
 *     upperCaseLetter: false, // 包含大写字母
 *     specialCharacter: false, // 包含特殊字符
 *     unallowableCharacter: false // 包含非法字符
 *   }
 * }
 *
 * validatePassword('a12345678', {level: 3});
 * // =>
 * {
 *   validated: false,
 *   level: 2,
 *   containes: {
 *     number: true,
 *     lowerCaseLetter: true,
 *     upperCaseLetter: false,
 *     specialCharacter: false,
 *     unallowableCharacter: false
 *   }
 * }
 *
 * validatePassword('_Aa一二三45678', {level: 3, ignoreCase: true});
 * // =>
 * {
 *   validated: false,
 *   level: 3,
 *   containes: {
 *     number: true,
 *     lowerCaseLetter: true,
 *     upperCaseLetter: true,
 *     specialCharacter: true,
 *     unallowableCharacter: true
 *   }
 * }
 *
 * // 自定义特殊字符
 * validatePassword('_Aa一二三45678', {level: 3, ignoreCase: true, special: '_一二三'});
 * // =>
 * {
 *   validated: true,
 *   level: 3,
 *   containes: {
 *     number: true,
 *     lowerCaseLetter: true,
 *     upperCaseLetter: true,
 *     specialCharacter: true,
 *     unallowableCharacter: false
 *   }
 * }
 */
declare function validatePassword(value: string, { level, ignoreCase, special }?: {
    level?: number | undefined;
    ignoreCase?: boolean | undefined;
    special?: string | undefined;
} | undefined): {
    validated: boolean;
    level: number;
    containes: {
        number: boolean;
        lowerCaseLetter: boolean;
        upperCaseLetter: boolean;
        specialCharacter: boolean;
        unallowableCharacter: boolean;
    };
};
