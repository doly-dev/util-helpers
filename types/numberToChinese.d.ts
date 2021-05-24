export default numberToChinese;
/**
 * 数字转中文数字
 * 不在安全数字 -9007199254740991～9007199254740991 内，处理会有异常
 *
 * @static
 * @alias module:Processor.numberToChinese
 * @since 1.2.0
 * @param {number} num 数字
 * @param {Object} [options] 配置项
 * @param {boolean} [options.big5=false] 繁体
 * @param {boolean} [options.unit=true] 计数单位
 * @param {string} [options.decimal="点"] 中文小数点
 * @param {string} [options.zero="零"] 设置0。常用配置 〇
 * @param {string} [options.negative="负"] 负数前面的字
 * @param {Object} [options.unitConfig] 节点单位配置
 * @param {string} [options.unitConfig.w="万"] 设置计数单位万。常用配置 萬
 * @param {string} [options.unitConfig.y="亿"] 设置计数单位亿。常用配置 億
 * @returns {string} 中文数字
 * @example
 *
 * numberToChinese(100);
 * // => 一百
 *
 * numberToChinese(100.3);
 * // => 一百点三
 *
 * // 繁体
 * numberToChinese(100, {big5: true});
 * // => 壹佰
 *
 * numberToChinese(100.3, {big5: true});
 * // => 壹佰点叁
 *
 * numberToChinese(1234567890, {big5: true});
 * // => 壹拾贰亿叁仟肆佰伍拾陆万柒仟捌佰玖拾
 *
 * // 不带计数单位
 * numberToChinese(1990, {unit: false});
 * // => 一九九零
 *
 * // 不带计数单位，修改0
 * numberToChinese(1990, {unit: false, zero:'〇'});
 * // => 一九九〇
 *
 */
declare function numberToChinese(num: number, { big5, unit, decimal, zero, negative, unitConfig }?: {
    big5?: boolean | undefined;
    unit?: boolean | undefined;
    decimal?: string | undefined;
    zero?: string | undefined;
    negative?: string | undefined;
    unitConfig?: {
        w?: string | undefined;
        y?: string | undefined;
    } | undefined;
} | undefined): string;
