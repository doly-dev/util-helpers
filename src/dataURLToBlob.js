/**
 * 将 DataURL 转为 Blob 对象
 *
 * @static
 * @alias module:Processor.dataURLToBlob
 * @see 参考 {@link https://developer.mozilla.org/zh-CN/docs/Glossary/Base64|Base64}
 * @since 4.1.0
 * @param {string} dataurl data: 协议的URL
 * @returns {Blob} Blob 对象
 * @example
 * const dataurl = 'data:text/html;base64,PGEgaWQ9ImEiPjxiIGlkPSJiIj5oZXkhPC9iPjwvYT4=';
 * dataURLToBlob(dataurl); // Blob {size: 32, type: 'text/html'}
 */
function dataURLToBlob(dataurl) {
  const parts = dataurl.split(/[:;,]/);
  const mime = parts[1];
  const decoder = parts[2] === 'base64' ? atob : decodeURIComponent;
  // @ts-ignore
  const bstr = decoder(parts.pop());
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

export default dataURLToBlob;
