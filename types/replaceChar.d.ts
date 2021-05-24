export default replaceChar;
/**
 * 替换字符，应用场景如：脱敏
 *
 * @static
 * @alias module:Processor.replaceChar
 * @since 1.1.0
 * @param {string} str 要处理的字符串
 * @param {Object} [options] 配置项
 * @param {number} [options.start=3] 开始位置
 * @param {number} [options.end=-4] 结束位置
 * @param {string} [options.char="*"] 替换字符
 * @param {number} [options.repeat] 替换字符的重复次数，默认为替换内容长度，可设置为固定值
 * @param {string} [options.exclude] 排除字符，如果指定排除项，repeat设置无效
 * @returns {string} 处理后的字符
 * @example
 *
 * // 手机号
 * replaceChar('13000000000');
 * // => 130****0000
 *
 * // 身份证
 * replaceChar('130701199310302288');
 * // => 130***********2288
 *
 * // 邮箱
 * const email = '12345@qq.com'
 * replaceChar(email, {start: 2, end: email.indexOf('@'), repeat: 4});
 * // => 12****@qq.com
 *
 * // 银行卡号
 * replaceChar('6228480402564890018', {start: 0, end: -4, repeat: 4});
 * // => ****0018
 *
 * // 带格式的银行卡号
 * replaceChar('6228 4804 0256 4890 018', {start: 4, end: -4, exclude: ' '});
 * // => 6228 **** **** **** 018
 *
 * // 用户名
 * replaceChar('林某某', {start: 1, end: -1, repeat: 1});
 * // => 林*某
 *
 */
declare function replaceChar(str?: string, { start, end, char, repeat, exclude }?: {
    start?: number | undefined;
    end?: number | undefined;
    char?: string | undefined;
    repeat?: number | undefined;
    exclude?: string | undefined;
} | undefined): string;
