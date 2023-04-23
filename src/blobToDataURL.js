//  file、blob文件如何预览图片？
//  方法1：将file或者blob类型文件转成base64数据，再作为src赋值给img标签
//  方法2：使用 window.URL.createObjectURL(blob) 为blob、file 创建一个指向该参数对象的URL

import fileReader from "./fileReader";

/**
 * 将 Blob 或 File 对象转成 data:URL 格式的 Base64 字符串<br/><br/>
 * 
 * <em style="font-weight: bold;">注意：该方法仅适用于浏览器端。</em>
 *
 * @ignore
 * @static
 * @alias module:Processor.blobToDataURL
 * @since 4.1.0
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsDataURL|FileReader.readAsDataURL()}
 * @deprecated 请使用 `fileReader` 方法
 * @param {Blob} blob Blob 或 File 对象
 * @returns {Promise<string>} data:URL 格式的 Base64 字符串。
 * @example
 * const aFileParts = ['<a id="a"><b id="b">hey!</b></a>']; // 一个包含DOMString的数组
 * const htmlBlob = new Blob(aFileParts, { type: 'text/html' }); // 得到 blob
 *
 * blobToDataURL(htmlBlob).then(data=>{
 *   console.log(data); // data:text/html;base64,PGEgaWQ9ImEiPjxiIGlkPSJiIj5oZXkhPC9iPjwvYT4=
 * });
 *
 * const textBlob = new Blob(aFileParts, { type: 'text/plain' });
 *
 * blobToDataURL(textBlob).then(data=>{
 *   console.log(data); // data:text/plain;base64,PGEgaWQ9ImEiPjxiIGlkPSJiIj5oZXkhPC9iPjwvYT4=
 * });
 */
function blobToDataURL(blob) {
  return fileReader(blob);
}

export default blobToDataURL;
