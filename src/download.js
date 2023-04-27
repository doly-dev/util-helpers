// 如果修改文档，请同步修改 interface.doc.js

import dataURLToBlob from "./dataURLToBlob";
import isUrl from "./isUrl";
import ajax from "./ajax";
import { isBlob } from "./utils/type";
import isPromiseLike from "./isPromiseLike";

/**
 * 下载文件
 * 
 * @param {string} blobUrl blob 地址
 * @param {string} [fileName] 文件名称
 */
function saver(blobUrl, fileName) {
  const anchor = document.createElement('a');
  // anchor.href = decodeURIComponent(blobUrl);
  anchor.href = blobUrl;
  anchor.style.display = 'none';
  anchor.setAttribute('download', fileName || '');

  /**
   * 处理点击事件，防止事件冒泡到 body/html 的点击事件。
   * 
   * @param {MouseEvent} e 鼠标事件对象
   */
  function handleClick(e) {
    e.stopPropagation();
    anchor.removeEventListener('click', handleClick);
  }
  anchor.addEventListener('click', handleClick);

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

/**
 * @typedef {import('./ajax.js').AjaxOptions} AjaxOptions ajax 配置项
 */

/**
 * @callback TransformRequest
 * @param {AjaxOptions} options ajax 配置项
 * @returns {AjaxOptions | Promise<AjaxOptions>}
 */

/**
 * @callback TransformResponse
 * @param {Blob} res 响应的Blob对象。如果你通过 transformRequest 修改了 responseType ，该参数将是该类型响应值。
 * @returns {Blob | Promise<Blob>}
 */

/**
 * @typedef {Object} DownloadOptions 下载配置项
 * @property {string} [options.fileName] 文件名称
 * @property {string} [options.type] MIME 类型
 * @property {'url'|'text'} [options.dataType] 手动设置数据类型，默认会根据传入的数据判断类型，主要是为了区分 url 和 text 。<br/>如果你要下载的文本是 url ，请设置 'text' ；如果你要下载的 url 是绝对/相对路径，请设置 'url' 。
 * @property {TransformRequest} [options.transformRequest] 请求前触发，XHR 对象或配置调整
 * @property {TransformResponse} [options.transformResponse] 请求成功后触发，在传递给 then/catch 前，允许修改响应数据
 */

/**
 * 下载<br/><br/>
 * 
 * <em style="font-weight: bold;">注意：该方法仅适用于浏览器端，兼容 IE10+ 和现代浏览器。</em>
 * 
 * @static
 * @alias module:Other.download
 * @since 4.16.0
 * @see {@link https://zh.wikipedia.org/wiki/多用途互聯網郵件擴展|MIME}
 * @see {@link https://9ykc9s.csb.app/|在线示例}
 * @param {string|Blob|ArrayBuffer|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|BigInt64Array|BigUint64Array} data 字符串、blob数据或url地址
 * @param {string|DownloadOptions} [options] 文件名称 或 配置项
 * @returns {Promise<void>}
 * @example
 * // 文本
 * download('hello world', 'text.txt');
 * 
 * // 远程文件
 * download('/xxx.jpg', { dataType: 'url' });
 * 
 * // blob文件
 * download(new Blob(['hello world']), 'text.txt');
 * 
 */
function download(data, options) {
  const config = typeof options === 'object' ? options : {};
  if (typeof options === 'string') {
    config.fileName = options;
  }
  const { fileName, type, dataType, transformRequest, transformResponse } = config;

  /** @type {Blob|undefined} */
  let payload;

  // dataURLs、blob url、url、string
  if (typeof data === 'string') {
    if (!dataType && /^blob:.*?\/.*/.test(data)) {
      // blob url
      saver(data, fileName);
      return Promise.resolve();
    } else if (!dataType && /^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(data)) {
      // dataURLs
      payload = dataURLToBlob(data);
    } else if (dataType === 'url' || (!dataType && isUrl(data))) {
      // url
      // 包装为异步方法
      /** @type {(opts: AjaxOptions)=>Promise<AjaxOptions>} */
      const asyncTransformRequest = (opts) => {
        // 请求前配置调整
        const tempOptions = typeof transformRequest === 'function' ? transformRequest(opts) : opts;
        // @ts-ignore
        return isPromiseLike(tempOptions) ? tempOptions : Promise.resolve(tempOptions);
      }
      /** @type {(res: Blob)=>Promise<Blob>} */
      const asyncTransformResponse = (res) => {
        const tempRes = typeof transformResponse === 'function' ? transformResponse(res) : res;
        // @ts-ignore
        return isPromiseLike(tempRes) ? tempRes : Promise.resolve(tempRes);
      }

      // 此处如果使用 async/await 语法糖，编译后的umd代码过大
      return asyncTransformRequest({ responseType: 'blob' }).then(ajaxOptions => {
        return ajax(data, ajaxOptions).then(e => {
          // @ts-ignore
          return asyncTransformResponse(e.target.response).then(res => {
            const currentFileName = fileName || data.split("?")[0].split("#")[0].split("/").pop();
            return download(res, { fileName: currentFileName, type: type || (isBlob(res) ? res.type : undefined) });
          });
        });
      })
    } else {
      // string
      payload = new Blob([data], { type: type || 'text/plain' });
    }
  } else if (data instanceof Blob) {
    // File or Blob
    payload = data;
  }

  // html、TypedArray
  if (!payload) {
    payload = new Blob([data], { type });
  }

  // @ts-ignore
  if (navigator.msSaveBlob) {
    // @ts-ignore
    navigator.msSaveBlob(payload, fileName || 'download');
  } else {
    const url = URL.createObjectURL(payload);
    saver(url, fileName);
    URL.revokeObjectURL(url);
  }

  return Promise.resolve();
}

export default download;