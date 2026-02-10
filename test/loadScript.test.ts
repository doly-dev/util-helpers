/**
 * @jest-environment jsdom
 * @jest-environment-options { "resources": "usable", "runScripts": "dangerously"}
 */
import { loadScript } from '../src';
import { createSpyConsole } from './fixtures/spyConsole';

const TIMEOUT = 30 * 1000;

// 模拟测试URL，避免真实网络请求
const testUrl = 'https://cdn.example.com/jquery.min.js';

// 模拟script元素的行为
const originalCreateElement = document.createElement;
beforeAll(() => {
  document.createElement = jest.fn((tagName: string) => {
    if (tagName === 'script') {
      const script = originalCreateElement.call(document, tagName) as HTMLScriptElement;

      // 存储原始的onload和onerror回调
      let originalOnload: ((this: GlobalEventHandlers, ev: Event) => any) | null = null;
      let originalOnerror: ((this: GlobalEventHandlers, ev: Event) => any) | null = null;

      // 模拟script的onload属性
      Object.defineProperty(script, 'onload', {
        set(fn: ((this: GlobalEventHandlers, ev: Event) => any) | null) {
          originalOnload = fn;
        },
        get() {
          return originalOnload;
        }
      });

      // 模拟script的onerror属性
      Object.defineProperty(script, 'onerror', {
        set(fn: ((this: GlobalEventHandlers, ev: Event) => any) | null) {
          originalOnerror = fn;
        },
        get() {
          return originalOnerror;
        }
      });

      // 模拟script的src属性
      Object.defineProperty(script, 'src', {
        set(src: string) {
          // 模拟src设置
          (script as any)._src = src;

          // 根据URL决定是触发onload还是onerror
          setTimeout(() => {
            if (src.includes('jquery') || src !== 'undefine.js') {
              // 模拟成功加载
              if (src.includes('jquery')) {
                // 模拟jQuery加载成功
                (globalThis as any).jQuery = jest.fn();
              }
              // 使用call设置正确的this上下文
              originalOnload?.call(script, new Event('load'));
            } else {
              // 模拟加载失败
              // 使用call设置正确的this上下文
              originalOnerror?.call(script, new Event('error'));
            }
          }, 0);
        },
        get() {
          return (script as any)._src;
        }
      });

      return script;
    }
    return originalCreateElement.call(document, tagName);
  }) as any;
});

afterAll(() => {
  document.createElement = originalCreateElement;
  delete (globalThis as any).jQuery;
});

describe('loadScript', () => {
  const spyConsoleError = createSpyConsole();

  afterAll(() => {
    spyConsoleError.mockRestore();
  });

  it(
    '加载成功',
    async () => {
      const script = await loadScript(testUrl);
      // @ts-ignore
      expect(globalThis.jQuery).toBeDefined();
      expect(script.async).toBe(true);
    },
    TIMEOUT
  );

  it(
    '设置属性',
    async () => {
      const script = await loadScript(testUrl, {
        async: false,
        id: 'abc',
        attrs: {
          foo: 'bar'
        }
      });

      // @ts-ignore
      expect(globalThis.jQuery).toBeDefined();
      expect(script.async).toBe(false);
      expect(script.id).toBe('abc');
      expect(script.getAttribute('foo')).toBe('bar');
    },
    TIMEOUT
  );

  it(
    '加载在 body 元素中',
    async () => {
      const head = document.head;
      document.documentElement.removeChild(head);
      const script = await loadScript(testUrl);
      expect(script.parentElement).toBe(document.body);
      document.documentElement.prepend(head);
    },
    TIMEOUT
  );

  it(
    '加载失败',
    async () => {
      try {
        await loadScript('undefine.js', { id: 'failed1' });
      } catch (err: any) {
        expect(err.message).toBe('Failed to load undefine.js');
        expect(document.querySelector('#failed1')).toBeNull();
      }
    },
    TIMEOUT
  );

  it(
    '加载失败不删除dom',
    async () => {
      try {
        await loadScript('undefine.js', { id: 'failed2', destroyOnError: false });
      } catch (err: any) {
        expect(err.message).toBe('Failed to load undefine.js');

        const script = document.querySelector('#failed2');
        expect(script!.id).toBe('failed2');
      }
    },
    TIMEOUT
  );

  it(
    '设置 `onload` 和 `onerror`',
    async () => {
      const loadFn = jest.fn();
      const errorFn = jest.fn();

      await loadScript(testUrl, {
        onload: loadFn,
        onerror: errorFn
      });

      expect(loadFn).toHaveBeenCalledTimes(1);
      expect(errorFn).toHaveBeenCalledTimes(0);

      try {
        await loadScript('undefine.js', {
          onload: loadFn,
          onerror: errorFn
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        /* empty */
      }

      expect(loadFn).toHaveBeenCalledTimes(1);
      expect(errorFn).toHaveBeenCalledTimes(1);
    },
    TIMEOUT
  );

  it('注入script', async () => {
    const script = await loadScript({
      text: 'console.log("hello world");'
    });

    expect(script.text).toBe('console.log("hello world");');
  });

  it('错误参数', async () => {
    // @ts-ignore
    const script1 = await loadScript(null, {});
    expect(script1.text).toBe('');

    // @ts-ignore
    const script2 = await loadScript(null);
    expect(script2.text).toBe('');
  });
});
