/**
 * @jest-environment jsdom
 * @jest-environment-options { "resources": "usable", "runScripts": "dangerously"}
 */
import { loadScript } from '../src';

const TIMEOUT = 60 * 1000;

describe('loadScript', () => {
  const spyConsoleError = jest.spyOn(globalThis.console, 'error').mockImplementation(() => {});

  afterAll(() => {
    spyConsoleError.mockRestore();
  });

  it(
    '加载成功',
    async () => {
      const script = await loadScript('https://unpkg.com/util-helpers@4.18.1/dist/util-helpers.min.js');
      // @ts-ignore
      expect(globalThis.utilHelpers).toBeDefined();
      expect(script.async).toBe(true);
    },
    TIMEOUT
  );

  it(
    '设置属性',
    async () => {
      const script = await loadScript('https://unpkg.com/util-helpers@4.18.1/dist/util-helpers.min.js', {
        async: false,
        id: 'abc',
        attrs: {
          foo: 'bar'
        }
      });

      // @ts-ignore
      expect(globalThis.utilHelpers).toBeDefined();
      expect(script.async).toBe(false);
      expect(script.id).toBe('abc');
      expect(script.getAttribute('foo')).toBe('bar');
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

      await loadScript('https://unpkg.com/util-helpers@4.18.1/dist/util-helpers.min.js', {
        onload: loadFn,
        onerror: errorFn
      });

      expect(loadFn).toBeCalledTimes(1);
      expect(errorFn).toBeCalledTimes(0);

      try {
        await loadScript('undefine.js', {
          onload: loadFn,
          onerror: errorFn
        });
      } catch (err) {
        /* empty */
      }

      expect(loadFn).toBeCalledTimes(1);
      expect(errorFn).toBeCalledTimes(1);
    },
    TIMEOUT
  );
});
