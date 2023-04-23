const FileReaderMethodMap = {
  arrayBuffer: 'readAsArrayBuffer',
  binaryString: 'readAsBinaryString',
  dataURL: 'readAsDataURL',
  text: 'readAsText'
}

/**
 * @overload
 * @param {Blob} blob
 * @param {'arrayBuffer'} type
 * @returns {Promise<ArrayBuffer>}
 */

/**
 * @overload
 * @param {Blob} blob
 * @param {'binaryString'|'binaryString'|'dataURL'|'text'} [type='dataURL']
 * @returns {Promise<string>}
 */

/**
 * 读取 Blob 或 File 对象，可以将 Blob 转为 Base64/String/ArrayBuffer<br/><br/>
 * 
 * <em style="font-weight: bold;">注意：该方法仅适用于浏览器端。</em>
 *
 * @static
 * @alias module:Processor.fileReader
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader|FileReader}
 * @since 4.16.0
 * @param {Blob} blob Blob 或 File 对象
 * @param {'arrayBuffer'|'binaryString'|'dataURL'|'text'} [type='dataURL'] Blob 或 File 对象
 * @returns {Promise<string|ArrayBuffer>} 文件的内容
 * @example
 * const aFileParts = ['<a id="a"><b id="b">hey!</b></a>']; // 一个包含DOMString的数组
 * const htmlBlob = new Blob(aFileParts, { type: 'text/html' }); // 得到 blob
 *
 * fileReader(htmlBlob).then(data=>{
 *   console.log(data); // data:text/html;base64,PGEgaWQ9ImEiPjxiIGlkPSJiIj5oZXkhPC9iPjwvYT4=
 * });
 *
 * const textBlob = new Blob(aFileParts, { type: 'text/plain' });
 *
 * fileReader(textBlob, 'text').then(data=>{
 *   console.log(data); // <a id="a"><b id="b">hey!</b></a>
 * });
 */
function fileReader(blob, type = 'dataURL') {
  let method = FileReaderMethodMap[type];
  if (!method) {
    method = FileReaderMethodMap.dataURL;
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    // @ts-ignore
    reader[method](blob);
    // @ts-ignore
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default fileReader;
