/**
 * @jest-environment jsdom
 * @jest-environment-options { "resources": "usable", "runScripts": "dangerously"}
 */
import { loadScript } from '../src';

const TIMEOUT = 60 * 1000;

const testUrl = 'https://cdn.bootcdn.net/ajax/libs/jquery/3.7.1/jquery.min.js';

describe('loadScript', () => {
  const spyConsoleError = jest.spyOn(globalThis.console, 'error').mockImplementation(() => {});

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
        expect(err.message).toBe('Failed to load http://localhost/undefine.js');
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
        expect(err.message).toBe('Failed to load http://localhost/undefine.js');

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
      } catch (err) {
        /* empty */
      }

      expect(loadFn).toHaveBeenCalledTimes(1);
      expect(errorFn).toHaveBeenCalledTimes(1);
    },
    TIMEOUT
  );
});
