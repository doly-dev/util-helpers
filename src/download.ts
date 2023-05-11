import dataURLToBlob from './dataURLToBlob';
import isUrl from './isUrl';
import ajax from './ajax';
import { isBlob } from './utils/type';
import isPromiseLike from './isPromiseLike';

// 下载文件到本地
function saver(blobUrl: string, fileName = '') {
  const anchor = document.createElement('a');
  // anchor.href = decodeURIComponent(blobUrl);
  anchor.href = blobUrl;
  anchor.style.display = 'none';
  anchor.setAttribute('download', fileName);

  // 处理点击事件，防止事件冒泡到 body/html 的点击事件。
  function handleClick(e: MouseEvent) {
    e.stopPropagation();
    anchor.removeEventListener('click', handleClick);
  }
  anchor.addEventListener('click', handleClick);

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

type DataType = string | Blob | ArrayBuffer | Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array | BigInt64Array | BigUint64Array;

type AjaxOptions = Parameters<typeof ajax>[1];
type TransformRequest = (options: AjaxOptions) => AjaxOptions | Promise<AjaxOptions>;
type TransformResponse = (res: Blob) => Blob | Promise<Blob>; // 响应的Blob对象。如果你通过 transformRequest 修改了 responseType ，该参数将是该类型响应值。

type DownloadOptions = {
  fileName?: string;
  type?: string;
  dataType?: 'url' | 'text';
  transformRequest?: TransformRequest;
  transformResponse?: TransformResponse;
};

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
 * 下载
 *
 * <em style="font-weight: bold;">注意：该方法仅适用于浏览器端，兼容 IE10+ 和现代浏览器。</em>
 *
 * @static
 * @alias module:Other.download
 * @since 4.16.0
 * @see {@link https://zh.wikipedia.org/wiki/多用途互聯網郵件擴展 | MIME}
 * @see {@link https://9ykc9s.csb.app/ | 在线示例}
 * @param {string|Blob|ArrayBuffer|TypedArray} data 字符串、blob数据或url地址
 * @param {string|DownloadOptions} [options] 文件名称 或 配置项
 * @returns {Promise<void>}
 * @example
 * // 文本
 * download('hello world', 'text.txt');
 *
 * // 远程文件1
 * // 不带协议的绝对地址，需要通过 dataType 指定为 url 类型
 * download('/xxx.jpg', { dataType: 'url', fileName: 'test.jpg' });
 *
 * // 远程文件2
 * download('https://example.com/xxx.jpg');
 *
 * // base64
 * download('data:image/png;base64,PGEgaWQ9ImEiPjxiIGlkPSJiIj5oZXkhPC9iPjwvYT4=', 'test.png');
 *
 * // blob文件
 * download(new Blob(['hello world']), 'text.txt');
 *
 * // 本地文件
 * download(File, 'filename.ext');
 *
 */
async function download(data: DataType, options?: string | DownloadOptions): Promise<void> {
  const config = typeof options === 'object' ? options : {};
  if (typeof options === 'string') {
    config.fileName = options;
  }
  const { fileName, type, dataType, transformRequest, transformResponse } = config;

  let payload: Blob | undefined;

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
      const asyncTransformRequest = (opts: AjaxOptions) => {
        // 请求前配置调整
        const tempOptions = typeof transformRequest === 'function' ? transformRequest(opts) : opts;
        return isPromiseLike(tempOptions) ? (tempOptions as Promise<AjaxOptions>) : Promise.resolve(tempOptions);
      };
      const asyncTransformResponse = (res: Blob) => {
        const tempRes = typeof transformResponse === 'function' ? transformResponse(res) : res;
        return isPromiseLike(tempRes) ? (tempRes as Promise<Blob>) : Promise.resolve(tempRes);
      };

      const ajaxOptions = await asyncTransformRequest({ responseType: 'blob' });
      const ev = await ajax(data, ajaxOptions);
      // @ts-ignore
      const res = await asyncTransformResponse(ev.target.response);
      const currentFileName = fileName || data.split('?')[0].split('#')[0].split('/').pop();
      return download(res, { fileName: currentFileName, type: type || (isBlob(res) ? res.type : undefined) });
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
