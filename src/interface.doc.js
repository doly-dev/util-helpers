/* eslint-disable no-unused-vars */
// 该文件用于 jsdoc 生成文件。因为一些 typescript 语法， jsdoc 不支持，导致生成文档报错。

/**
 * 转换字段名，返回一个转换字段后的值，不改变原值。
 * 
 * @static
 * @alias module:Tree.transformFieldNames
 * @since 4.14.0
 * @param {object[]} data 对象数组。如果是树结构数据，需要指定第三个参数 childrenField
 * @param {object} fieldNames 字段名映射
 * @param {string} [childrenField] 子级数据字段名
 * @param {'spread'|'self'} [nodeAssign='spread'] 节点赋值方式。spread表示使用展开运算符创建新值，self表示使用自身对象。
 * @returns {object[]}
 * @example
 * 
 * const options = [{code: '1', name: 'one'},{code:'2', name:'two'}];
 * const newOptions = transformFieldNames(options, {label: 'name', value: 'code'});
 * // [{value: '1', label: 'one'},{value:'2', label:'two'}]
 * 
 * // 嵌套数据，指定子级字段名 children
 * const options2 = [{code: '1', name: 'one'},{code:'2', name:'two', children: [{code:'2-1', name:'two-one', children: [{code: '2-1-1', name:'two-one-one'}]}]}];
 * const newOptions2 = transformFieldNames(options2, {label: 'name', value: 'code'}, 'children');
 * // [{value: '1', label: 'one'},{value:'2', label:'two', children: [{value: '2-1', label:'two-one', children: [{value: '2-1-1', label:'two-one-one'}]}]}]
 * 
 * const options3 = [{code: '1', name: 'one'},{code:'2', name:'two', childs: [{code:'2-1', name:'two-one'}]}];
 * const newOptions3 = transformFieldNames(options3, {label: 'name', value: 'code'}, 'childs');
 * // [{value: '1', label: 'one'},{value:'2', label:'two', childs: [{value: '2-1', label:'two-one'}]}]
 * 
 * // 嵌套数据，并替换子集字段名
 * const newOptions4 = transformFieldNames(options3, {label: 'name', value: 'code', children: 'childs'}, 'childs');
 * // [{value: '1', label: 'one'},{value:'2', label:'two', children: [{value: '2-1', label:'two-one'}]}]
 */
function transformFieldNames(data, fieldNames, childrenField) { }

/**
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest|XMLHttpRequest}
 * @typedef {Object} AjaxOptions ajax配置项
 * @property {string} [method="get"] 创建请求时使用的方法
 * @property {*} [data=null] 请求体被发送的数据
 * @property {object} [headers] 自定义请求头
 * @property {string} [responseType] 响应类型
 * @property {number} [timeout] 请求超时的毫秒数
 * @property {boolean} [withCredentials=false] 跨域请求时是否需要使用凭证
 * @property {boolean} [async=true] 是否异步执行操作
 * @property {string|null} [user=null] 用户名，用于认证用途
 * @property {string|null} [password=null] 密码，用于认证用途
 * @property {function} [onLoadStart] 接收到响应数据时触发
 * @property {function} [onProgress] 请求接收到更多数据时，周期性地触发
 * @property {function} [onAbort] 当 request 被停止时触发，例如当程序调用 XMLHttpRequest.abort() 时
 * @property {function} [onTimeout] 在预设时间内没有接收到响应时触发
 * @property {function} [onError] 当 request 遭遇错误时触发
 * @property {function} [onLoad] 请求成功完成时触发
 * @property {function} [onLoadEnd] 请求结束时触发，无论请求成功 (load) 还是失败 (abort 或 error)
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
 * @returns {Promise<object>} XHR 事件对象
 * @example
 * ajax('/somefile').then(res=>{
 *   // do something
 * });
 * 
 * ajax('/api', { method: 'post' }).then(res=>{
 *   // do something
 * });
 */
function ajax(url, options) { }

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
 * @param {string|Blob|TypedArray} data 字符串、blob数据或url地址
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
function download(data, fileName, options) { }