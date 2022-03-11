/**
 * 设置 DataURL 前缀、MIME 类型、base64 标识。<br/>
 * 如果你需要获取DataURL 的 MIME 类型和数据本身，推荐使用 <a href="https://www.npmjs.com/package/data-urls">data-urls</a>。
 *
 * @static
 * @alias module:Processor.setDataURLPrefix
 * @see 参考 {@link https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/Data_URIs|Data URLs}
 * @see 参考 {@link https://mimesniff.spec.whatwg.org/#understanding-mime-types|MIME types}
 * @since 4.1.0
 * @param {string} data 数据本身
 * @param {string} [mimetype="image/png"] MIME 类型
 * @param {boolean} [base64=true] 添加 base64 标识
 * @returns {string} DataURL 格式的字符串
 * @example
 * const data = 'PGEgaWQ9ImEiPjxiIGlkPSJiIj5oZXkhPC9iPjwvYT4=';
 * setDataURLPrefix(data); // data:image/png;base64,PGEgaWQ9ImEiPjxiIGlkPSJiIj5oZXkhPC9iPjwvYT4=
 * setDataURLPrefix(data, 'image/png', false); // data:image/png,PGEgaWQ9ImEiPjxiIGlkPSJiIj5oZXkhPC9iPjwvYT4=
 * setDataURLPrefix(data, 'image/jpg'); // data:image/jpg;base64,PGEgaWQ9ImEiPjxiIGlkPSJiIj5oZXkhPC9iPjwvYT4=
 * setDataURLPrefix(data, 'text/html'); // data:text/html;base64,PGEgaWQ9ImEiPjxiIGlkPSJiIj5oZXkhPC9iPjwvYT4=
 * setDataURLPrefix(data, ''); // data:;base64,PGEgaWQ9ImEiPjxiIGlkPSJiIj5oZXkhPC9iPjwvYT4=
 * setDataURLPrefix(data, '', false); // data:,PGEgaWQ9ImEiPjxiIGlkPSJiIj5oZXkhPC9iPjwvYT4=
 */
function setDataURLPrefix(data, mimetype = 'image/png', base64 = true) {
  return `data:${mimetype}${base64 ? ';base64' : ''},${data}`;
}

export default setDataURLPrefix;
