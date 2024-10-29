/**
 * @jest-environment jsdom
 */
import { injectStyle } from '../src';

describe('injectStyle', () => {
  let originalHead: HTMLElement;
  let originalBody: HTMLElement;

  beforeAll(() => {
    originalHead = document.head;
    originalBody = document.body;
  });

  afterEach(() => {
    // 清理所有 <style> 元素
    const styles = document.querySelectorAll('style');
    styles.forEach((style) => style.remove());
  });

  afterAll(() => {
    document.documentElement.prepend(originalHead);
    document.body = originalBody;
  });

  it('默认将样式注入 head', () => {
    const css = 'body { background-color: red; }';
    injectStyle(css);

    const style = document.head.querySelector('style');
    expect(style).not.toBeNull();
    expect(style?.innerHTML).toContain(css);
  });

  it('将样式注入指定容器', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const css = 'div { color: blue; }';

    injectStyle(css, { container });

    const style = container.querySelector('style');
    expect(style).not.toBeNull();
    expect(style?.innerHTML).toContain(css);
  });

  it('在顶部注入样式', () => {
    const css1 = 'h1 { font-size: 20px; }';
    const css2 = 'p { margin: 10px; }';

    injectStyle(css1);
    injectStyle(css2, { insertAt: 'top' });

    const styles = document.head.querySelectorAll('style');
    expect(styles[0].innerHTML).toContain(css2);
    expect(styles[1].innerHTML).toContain(css1);
  });

  it('在底部注入样式', () => {
    const css1 = 'h1 { font-size: 20px; }';
    const css2 = 'p { margin: 10px; }';

    injectStyle(css1);
    injectStyle(css2, { insertAt: 'bottom' });

    const styles = document.head.querySelectorAll('style');
    expect(styles[0].innerHTML).toContain(css1);
    expect(styles[1].innerHTML).toContain(css2);
  });

  it('处理空样式', () => {
    const css = '';
    const style = injectStyle(css);

    expect(style.innerHTML).toBe('');
  });

  it('没有 head 元素', () => {
    const css = 'p { margin: 10px; }';
    document.documentElement.removeChild(document.head);
    injectStyle(css);

    const style = document.body.querySelector('style');
    expect(style).not.toBeNull();
    expect(style?.innerHTML).toContain(css);

    document.documentElement.prepend(originalHead);
  });

  it('不存在 document.head', () => {
    const css = 'p { margin: 10px; }';
    Object.defineProperty(document, 'head', {
      get() {
        return null;
      },
      configurable: true
    });

    injectStyle(css);

    const style = originalHead.querySelector('style');
    expect(style).not.toBeNull();
    expect(style?.innerHTML).toContain(css);

    Object.defineProperty(document, 'head', {
      get() {
        return originalHead;
      },
      configurable: true
    });
  });

  it('兼容 ie 处理', () => {
    const originalCreateElement = document.createElement;
    const spy = jest.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
      const element = originalCreateElement.bind(document)(tagName);
      // @ts-ignore
      element.styleSheet = {};
      // @ts-ignore
      Object.defineProperty(element.styleSheet, 'cssText', {
        set(v: string) {
          console.log('element.innerHTML: ', v);
          element.innerHTML = v;
        },
        get() {
          return element.innerHTML;
        }
      });
      return element;
    });

    const css = 'p { margin: 10px; } div { background: red; }';

    injectStyle(css);
    const style = document.querySelector('style');
    expect(style).not.toBeNull();
    expect(style?.innerHTML).toContain(css);

    spy.mockReset();
    spy.mockRestore();
  });

  it('不存在 container.prepend 方法', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const css = 'a { color: blue; }';
    const child1 = document.createElement('a');

    container.appendChild(child1);

    Object.defineProperty(container, 'prepend', {
      get() {
        return null;
      }
    });

    expect(container.firstChild).toBe(child1);

    injectStyle(css, { container });

    const style = container.querySelector('style');
    expect(style).not.toBeNull();
    expect(style?.innerHTML).toContain(css);
    expect(container.firstChild).toBe(style);
  });

  it('处理错误的容器', () => {
    const css = 'body { color: green; }';

    expect(() => {
      // @ts-ignore
      injectStyle(css, { container: null });
    }).toThrow();
  });
});
