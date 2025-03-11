import { objectKeys } from './utils/native';

type XMLHttpRequestListener = XMLHttpRequest['onloadstart'];
type DataType = Parameters<XMLHttpRequest['send']>[0];

type AjaxOptions = {
  method?: string;
  async?: boolean;
  user?: string | null;
  password?: string | null;
  data?: DataType;
  headers?: Record<string, string>;
  responseType?: XMLHttpRequestResponseType;
  timeout?: number;
  withCredentials?: boolean;
  onReadyStateChange?: XMLHttpRequest['onreadystatechange'];
  onLoadStart?: XMLHttpRequestListener;
  onProgress?: XMLHttpRequestListener;
  onAbort?: XMLHttpRequestListener;
  onTimeout?: XMLHttpRequestListener;
  onError?: XMLHttpRequestListener;
  onLoad?: XMLHttpRequestListener;
  onLoadEnd?: XMLHttpRequestListener;
};

/**
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest XMLHttpRequest}
 * @typedef {Object} AjaxOptions ajax 配置项
 * @property {string} [method="get"] 创建请求时使用的方法
 * @property {boolean} [async=true] 是否异步执行操作
 * @property {string|null} [user=null] 用户名，用于认证用途
 * @property {string|null} [password=null] 密码，用于认证用途
 * @property {Object} [headers] 自定义请求头
 * @property {string} [responseType] 响应类型
 * @property {number} [timeout] 请求超时的毫秒数
 * @property {boolean} [withCredentials=false] 跨域请求时是否需要使用凭证
 * @property {*} [data=null] 请求体被发送的数据
 * @property {function} [onReadyStateChange] 当 readyState 属性发生变化时触发
 * @property {function} [onLoadStart] 接收到响应数据时触发
 * @property {function} [onProgress] 请求接收到更多数据时，周期性地触发
 * @property {function} [onAbort] 当 request 被停止时触发，例如当程序调用 XMLHttpRequest.abort() 时
 * @property {function} [onTimeout] 在预设时间内没有接收到响应时触发
 * @property {function} [onError] 当 request 遭遇错误时触发
 * @property {function} [onLoad] 请求成功完成时触发
 * @property {function} [onLoadEnd] 请求结束时触发，无论请求成功 (load) 还是失败 (abort 或 error)
 */

/**
 * 请求
 *
 * <em style="font-weight: bold;">注意：该方法仅适用于浏览器端。</em>
 *
 * @alias module:Browser.ajax
 * @since 4.16.0
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest XMLHttpRequest}
 * @param {string} url 地址
 * @param {AjaxOptions} [options] 配置项
 * @param {string} [options.method="get"] 创建请求时使用的方法。默认 `'get'`。
 * @param {boolean} [options.async=true] 是否异步执行操作。默认 `true`。
 * @param {string|null} [options.user=null] 用户名，用于认证用途。默认 `null`。
 * @param {string|null} [options.password=null] 密码，用于认证用途。默认 `null`。
 * @param {Object} [options.headers] 自定义请求头。
 * @param {string} [options.responseType] 响应类型。
 * @param {number} [options.timeout] 请求超时的毫秒数。
 * @param {boolean} [options.withCredentials=false] 跨域请求时是否需要使用凭证。默认 `false`。
 * @param {*} [options.data=null] 请求体被发送的数据。默认 `null`。
 * @param {function} [options.onReadyStateChange] 当 readyState 属性发生变化时触发。
 * @param {function} [options.onLoadStart] 接收到响应数据时触发。
 * @param {function} [options.onProgress] 请求接收到更多数据时，周期性地触发。
 * @param {function} [options.onAbort] 当 request 被停止时触发，例如当程序调用 XMLHttpRequest.abort() 时。
 * @param {function} [options.onTimeout] 在预设时间内没有接收到响应时触发。
 * @param {function} [options.onError] 当 request 遭遇错误时触发。
 * @param {function} [options.onLoad] 请求成功完成时触发。
 * @param {function} [options.onLoadEnd] 请求结束时触发，无论请求成功 (load) 还是失败 (abort 或 error)。
 * @returns {Promise<object>} XHR 事件对象。
 * @example
 * ajax('/somefile').then(res=>{
 *   // do something
 * });
 *
 * ajax('/api', { method: 'post' }).then(res=>{
 *   // do something
 * });
 *
 * // 中断请求
 * let xhr: XMLHttpRequest | null = null;
 * ajax('./download/test.txt', {
 *   onLoadStart(e) {
 *     console.log('onLoadStart', e);
 *     xhr = e.target;
 *   }
 * }).finally(() => {
 *   console.log('finally');
 *   xhr = null;
 * });
 *
 * if(ABORT_CONDITION){
 *   if(xhr){
 *      xhr.abort();
 *   }
 * }
 *
 */
function ajax(url: string, options?: AjaxOptions) {
  const { method = 'get', data = null, timeout, headers, withCredentials = false, async = true, user = null, password = null, responseType, onReadyStateChange, onLoadStart, onProgress, onAbort, onTimeout, onError, onLoad, onLoadEnd } = options || {};

  return new Promise<ProgressEvent>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method.toLowerCase(), url, async, user, password);

    if (onReadyStateChange) {
      xhr.onreadystatechange = onReadyStateChange;
    }

    // 设置请求超时
    if (typeof timeout === 'number' && timeout > 0) {
      xhr.timeout = timeout;
    }

    // 跨域请求时是否需要使用凭证
    xhr.withCredentials = withCredentials;

    // 设置响应类型
    if (responseType) {
      xhr.responseType = responseType;
    }

    // 设置请求头
    if (typeof headers === 'object') {
      objectKeys(headers).map((item) => {
        xhr.setRequestHeader(item, headers[item]);
      });
    }

    // 请求成功异步调用
    const wrapSuccess = (cb?: XMLHttpRequestListener) => {
      // 内部方法
      return (e: ProgressEvent) => {
        resolve(e);
        cb?.call(xhr, e);
      };
    };

    // 请求失败（中断/超时/失败）处理
    const wrapError = (cb?: XMLHttpRequestListener) => {
      // 内部方法
      return (e: ProgressEvent) => {
        reject(e);
        cb?.call(xhr, e);
      };
    };

    // 事件处理
    const events = {
      loadstart: onLoadStart,
      progress: onProgress,
      abort: wrapError(onAbort),
      timeout: wrapError(onTimeout),
      error: wrapError(onError),
      load: wrapSuccess(onLoad),
      loadend: onLoadEnd
    };

    const eventKeys = objectKeys(events) as (keyof typeof events)[];

    eventKeys.forEach((item) => {
      const func = events[item];
      if (func) {
        xhr.addEventListener(item, func);
      }
    });

    xhr.send(data);
  });
}

export default ajax;
