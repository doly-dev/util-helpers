/**
 * @jest-environment jsdom
 */
import { sleep } from 'ut2';
import { ajax } from '../src';

describe('ajax', () => {
  enum ResponseMethod {
    Load,
    Abort,
    Timeout,
    Error
  }

  let resMethod = ResponseMethod.Load; // 将要触发的响应方法

  // 参考: https://stackoverflow.com/questions/28584773/xmlhttprequest-testing-in-jest
  const xhrMock = {
    open: jest.fn(),
    send: jest.fn(),
    setRequestHeader: jest.fn()
  };

  const spy = jest.spyOn(globalThis, 'XMLHttpRequest').mockImplementation(() => {
    const methods: Record<string, () => void> = {};

    async function send() {
      methods.loadstart?.();

      if (resMethod === ResponseMethod.Abort) {
        methods.abort();
      } else if (resMethod === ResponseMethod.Error) {
        methods.error();
      } else if (resMethod === ResponseMethod.Timeout) {
        methods.timeout();
      } else {
        await sleep(100);
        methods.progress?.();
        await sleep(100);
        methods.progress?.();

        methods.load();
      }
      methods.loadend?.();
    }

    return {
      abort: jest.fn().mockImplementation(() => {
        resMethod = ResponseMethod.Abort;
      }),
      addEventListener: jest.fn().mockImplementation(function (fnName, fn) {
        methods[fnName] = fn;
      }),
      dispatchEvent: jest.fn(),
      error: jest.fn(),
      getResponseHeader: jest.fn(),
      load: jest.fn(),
      loadend: jest.fn(),
      loadstart: jest.fn(),
      onreadystatechange: jest.fn(),
      open: xhrMock.open,
      progress: jest.fn(),
      readyState: jest.fn(),
      removeEventListener: jest.fn(),
      response: jest.fn(),
      responseText: jest.fn(),
      responseType: jest.fn(),
      responseURL: jest.fn(),
      responseXML: jest.fn(),
      send: xhrMock.send.mockImplementation(send),
      setRequestHeader: xhrMock.setRequestHeader,
      status: jest.fn(),
      statusText: jest.fn(),
      ontimeout: jest.fn(),
      upload: jest.fn(),
      withCredentials: jest.fn()
    } as any;
  });

  afterAll(() => {
    spy.mockRestore();
  });

  it('返回 promise', async () => {
    const promise = ajax('/test');
    expect(typeof promise.then).toBe('function');
    expect(typeof promise.catch).toBe('function');
  });

  it('method params', async () => {
    ajax('/test', {
      headers: {
        'Cache-Control': 'no-cache'
      },
      data: 'a=1&b=2',
      timeout: 1000,
      responseType: 'json',
      withCredentials: true,
      async: false,
      user: 'admin',
      password: '12345'
    });
    expect(xhrMock.open).toHaveBeenCalledWith('get', '/test', true, null, null);
    expect(xhrMock.setRequestHeader).toHaveBeenCalledWith('Cache-Control', 'no-cache');
    expect(xhrMock.send).toHaveBeenCalledWith('a=1&b=2');
  });

  it('callback', async () => {
    const readyStateChangeFn = jest.fn();
    const loadstartFn = jest.fn();
    const abortFn = jest.fn();
    const timeoutFn = jest.fn();
    const errorFn = jest.fn();
    const loadFn = jest.fn();
    const loadendFn = jest.fn();

    const resolveFn = jest.fn();
    const rejectFn = jest.fn();

    try {
      await ajax('/test', {
        onReadyStateChange: readyStateChangeFn,
        onLoadStart: loadstartFn,
        onAbort: abortFn,
        onTimeout: timeoutFn,
        onError: errorFn,
        onLoad: loadFn,
        onLoadEnd: loadendFn
      });
      resolveFn();
    } catch (err) {
      rejectFn();
    }

    expect(loadstartFn).toHaveBeenCalledTimes(1);
    expect(abortFn).toHaveBeenCalledTimes(0);
    expect(timeoutFn).toHaveBeenCalledTimes(0);
    expect(errorFn).toHaveBeenCalledTimes(0);
    expect(loadFn).toHaveBeenCalledTimes(1);
    expect(loadendFn).toHaveBeenCalledTimes(1);

    expect(resolveFn).toHaveBeenCalledTimes(1);
    expect(rejectFn).toHaveBeenCalledTimes(0);

    // abort
    resMethod = ResponseMethod.Abort;
    try {
      await ajax('/test', {
        onLoadStart: loadstartFn,
        onAbort: abortFn,
        onTimeout: timeoutFn,
        onError: errorFn,
        onLoad: loadFn,
        onLoadEnd: loadendFn
      });
      resolveFn();
    } catch (err) {
      rejectFn();
    }

    expect(loadstartFn).toHaveBeenCalledTimes(2);
    expect(abortFn).toHaveBeenCalledTimes(1);
    expect(timeoutFn).toHaveBeenCalledTimes(0);
    expect(errorFn).toHaveBeenCalledTimes(0);
    expect(loadFn).toHaveBeenCalledTimes(1);
    expect(loadendFn).toHaveBeenCalledTimes(2);

    expect(resolveFn).toHaveBeenCalledTimes(1);
    expect(rejectFn).toHaveBeenCalledTimes(1);

    // timeout
    resMethod = ResponseMethod.Timeout;
    try {
      await ajax('/test', {
        onLoadStart: loadstartFn,
        onAbort: abortFn,
        onTimeout: timeoutFn,
        onError: errorFn,
        onLoad: loadFn,
        onLoadEnd: loadendFn
      });
      resolveFn();
    } catch (err) {
      rejectFn();
    }

    expect(loadstartFn).toHaveBeenCalledTimes(3);
    expect(abortFn).toHaveBeenCalledTimes(1);
    expect(timeoutFn).toHaveBeenCalledTimes(1);
    expect(errorFn).toHaveBeenCalledTimes(0);
    expect(loadFn).toHaveBeenCalledTimes(1);
    expect(loadendFn).toHaveBeenCalledTimes(3);

    expect(resolveFn).toHaveBeenCalledTimes(1);
    expect(rejectFn).toHaveBeenCalledTimes(2);

    // error
    resMethod = ResponseMethod.Error;
    try {
      await ajax('/test', {
        onLoadStart: loadstartFn,
        onAbort: abortFn,
        onTimeout: timeoutFn,
        onError: errorFn,
        onLoad: loadFn,
        onLoadEnd: loadendFn
      });
      resolveFn();
    } catch (err) {
      rejectFn();
    }

    expect(loadstartFn).toHaveBeenCalledTimes(4);
    expect(abortFn).toHaveBeenCalledTimes(1);
    expect(timeoutFn).toHaveBeenCalledTimes(1);
    expect(errorFn).toHaveBeenCalledTimes(1);
    expect(loadFn).toHaveBeenCalledTimes(1);
    expect(loadendFn).toHaveBeenCalledTimes(4);

    expect(resolveFn).toHaveBeenCalledTimes(1);
    expect(rejectFn).toHaveBeenCalledTimes(3);
  });
});
