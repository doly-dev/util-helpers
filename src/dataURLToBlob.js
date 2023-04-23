/**
 * 将 DataURL 转为 Blob 对象
 *
 * @static
 * @alias module:Processor.dataURLToBlob
 * @since 4.1.0
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Glossary/Base64|Base64}
 * @param {string} dataurl data: 协议的URL
 * @returns {Blob} Blob 对象
 * @example
 * const dataurl = 'data:text/html;base64,PGEgaWQ9ImEiPjxiIGlkPSJiIj5oZXkhPC9iPjwvYT4=';
 * dataURLToBlob(dataurl); // Blob {size: 32, type: 'text/html'}
 */
function dataURLToBlob(dataurl) {
  const parts = dataurl.split(',');
  const meta = parts[0].substring(5).split(';');
  const type = meta[0];
  const decoder = meta.indexOf('base64') !== -1 ? atob : decodeURIComponent;
  const bstr = decoder(parts[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type });
}

export default dataURLToBlob;
