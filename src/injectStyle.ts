/**
 * 注入样式。
 *
 * @alias module:Browser.injectStyle
 * @since 5.3.0
 * @param {string} css 样式内容。
 * @param {Object} [options] 配置项。
 * @param {HTMLElement} [options.container=document.head] 要注入样式的容器。默认 `document.head`。如果 `document.head` 不存在，默认 `document.body`。
 * @param {'top' | 'bottom'} [options.insertAt='top'] 注入容器内容前面还是后面。默认 `top`。
 * @param {Function} [options.onBefore] 注入样式前的回调方法。
 * @returns {HTMLStyleElement} `style` 元素。
 */
function injectStyle(
  css: string,
  options?: {
    container?: HTMLElement;
    insertAt?: 'top' | 'bottom';
    onBefore?: (style: HTMLStyleElement) => void;
  }
) {
  const { container = document.head || document.getElementsByTagName('head')[0] || document.body, insertAt = 'top', onBefore } = options || {};
  const style = document.createElement('style');

  // IE
  // @ts-ignore
  if (style.styleSheet) {
    // @ts-ignore
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  if (typeof onBefore === 'function') {
    onBefore(style);
  }

  const atTop = insertAt === 'top';

  if (atTop && container.prepend) {
    container.prepend(style);
  } else if (atTop && container.firstChild) {
    container.insertBefore(style, container.firstChild);
  } else {
    container.appendChild(style);
  }
  return style;
}

export default injectStyle;
