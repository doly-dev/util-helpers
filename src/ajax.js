/**
 * @typedef {XMLHttpRequest['onloadstart']} XMLHttpRequestEvent XMLHttpRequest 事件对象
 */

/**
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest|XMLHttpRequest}
 * @typedef {Object} AjaxOptions ajax配置项
 * @property {string} [method="get"] 创建请求时使用的方法
 * @property {Document | XMLHttpRequestBodyInit | null} [data=null] 请求体被发送的数据
 * @property {Object.<string, string>} [headers] 自定义请求头
 * @property {XMLHttpRequestResponseType} [responseType] 响应类型
 * @property {number} [timeout] 请求超时的毫秒数
 * @property {boolean} [withCredentials=false] 跨域请求时是否需要使用凭证
 * @property {boolean} [async=true] 是否异步执行操作
 * @property {string|null} [user=null] 用户名，用于认证用途
 * @property {string|null} [password=null] 密码，用于认证用途
 * @property {XMLHttpRequestEvent} [onLoadStart] 接收到响应数据时触发
 * @property {XMLHttpRequestEvent} [onProgress] 请求接收到更多数据时，周期性地触发
 * @property {XMLHttpRequestEvent} [onAbort] 当 request 被停止时触发，例如当程序调用 XMLHttpRequest.abort() 时
 * @property {XMLHttpRequestEvent} [onTimeout] 在预设时间内没有接收到响应时触发
 * @property {XMLHttpRequestEvent} [onError] 当 request 遭遇错误时触发
 * @property {XMLHttpRequestEvent} [onLoad] 请求成功完成时触发
 * @property {XMLHttpRequestEvent} [onLoadEnd] 请求结束时触发，无论请求成功 (load) 还是失败 (abort 或 error)
 */

/**
 * 请求<br/><br/>
 * 
 * <em style="font-weight: bold;">注意：该方法仅适用于浏览器端。</em>
 * 
 * @static
 * @alias module:Other.ajax
 * @since 4.16.0
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest|XMLHttpRequest}
 * @param {string} url 地址
 * @param {AjaxOptions} [options] 配置项
 * @returns {Promise<ProgressEvent<EventTarget>>}
 * @example
 * ajax('/somefile').then(res=>{
 *   // do something
 * });
 * 
 * ajax('/api', { method: 'post' }).then(res=>{
 *   // do something
 * });
 */
function ajax(url, options) {
  const {
    method = 'get',
    data = null,
    timeout,
    headers,
    withCredentials = false,
    async = true,
    user = null,
    password = null,
    responseType,
    onAbort,
    onError,
    onLoad,
    onLoadEnd,
    onLoadStart,
    onProgress,
    onTimeout
  } = options || {};

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method.toLowerCase(), url, async, user, password);

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
      Object.keys(headers).map(item => {
        xhr.setRequestHeader(item, headers[item]);
      });
    }

    /**
     * 请求成功异步调用
     * @param {XMLHttpRequestEvent} [cb] 回调方法
     */
    const wrapSuccess = (cb) => {
      /**
       * 内部方法
       * @param {ProgressEvent<EventTarget>} e 事件对象
       */
      return (e) => {
        resolve(e);
        cb?.call(xhr, e);
      }
    }

    /**
     * 请求失败（中断/超时/失败）处理
       * @param {XMLHttpRequestEvent} [cb] 回调方法
     */
    const wrapError = (cb) => {
      /**
       * 内部方法
       * @param {ProgressEvent<EventTarget>} e 事件对象
       */
      return (e) => {
        reject(e);
        cb?.call(xhr, e);
      }
    }

    // 事件处理
    /**@type {Object.<keyof XMLHttpRequestEventTargetEventMap, XMLHttpRequestEvent | undefined>} */
    const events = {
      loadstart: onLoadStart,
      progress: onProgress,
      abort: wrapError(onAbort),
      timeout: wrapError(onTimeout),
      error: wrapError(onError),
      load: wrapSuccess(onLoad),
      loadend: onLoadEnd
    }
    /**@type {(keyof XMLHttpRequestEventTargetEventMap)[]} */
    // @ts-ignore
    const eventNames = Object.keys(events);

    eventNames.map(item => {
      const func = events[item];
      if (func) {
        xhr.addEventListener(item, func);
      }
    });

    xhr.send(data);
  });
}

export default ajax;