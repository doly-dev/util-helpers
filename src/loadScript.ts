type ScriptAttribute = Pick<HTMLScriptElement, 'async' | 'crossOrigin' | 'defer' | 'integrity' | 'noModule' | 'referrerPolicy' | 'text' | 'type' | 'onload' | 'onerror' | 'id' | 'className'> & {
  attrs: Record<string, string>;
  destroyOnError: boolean;
};

/**
 * 加载 js 文件。
 *
 * 默认属性 `async=true` `type=text/javascript` 。如果加载失败，默认会删除该 `script` 的 `dom` 标签。
 *
 * <em style="font-weight: bold;">注意：该方法仅适用于浏览器端。</em>
 *
 * @static
 * @alias module:Other.loadScript
 * @since 4.19.0
 * @param {string} src  js 地址。
 * @param {Object} [options] script 标签属性。比如 `defer` `onload` `onerror` `id` 等，下面列举部分带有默认值或额外扩展的配置。
 * @param {boolean} [options.destroyOnError=true] 如果加载失败或错误，自动删除 dom 中的 script 标签。
 * @param {Object} [options.attrs] 自定义 script 属性，通过 script.setAttribute 设置。
 * @param {boolean} [options.async=true] 异步加载。
 * @param {string} [options.type='text/javascript'] 类型。
 * @return {Promise<HTMLScriptElement>} 异步返回 script 元素。
 * @example
 *
 * loadScript('some.js').then(script=>{
 *   // do something
 * })
 *
 * loadScript('some.js', { id: 'xxx', async: false, attrs: { foo: 'bar' } }).then(script=>{
 *   // do something
 * })
 *
 */
function loadScript(src: string, options?: Partial<ScriptAttribute>) {
  return new Promise<HTMLScriptElement>((resolve, reject) => {
    const head = document.head;
    const script = document.createElement('script');

    const { attrs, destroyOnError = true, ...restOptions } = options || {};

    const props: Partial<HTMLScriptElement> = {
      async: true,
      type: 'text/javascript',
      ...restOptions,
      src
    };

    for (const key in props) {
      if (key === 'onload' || key === 'onerror') {
        continue;
      }
      // @ts-ignore
      script[key] = props[key as keyof ScriptAttribute];
    }

    if (typeof attrs === 'object') {
      Object.keys(attrs).forEach((key) => {
        script.setAttribute(key, attrs[key]);
      });
    }

    script.onload = function (ev: Event) {
      this.onerror = this.onload = null;
      props.onload?.call(this, ev);
      resolve(script);
    };

    script.onerror = function (ev: Event | string) {
      this.onerror = this.onload = null;
      props.onerror?.call(this, ev);
      if (destroyOnError) {
        head.removeChild(script);
      }
      reject(new URIError('Failed to load ' + this.src));
    };

    head.appendChild(script);
  });
}

export default loadScript;
