/**
 * @jest-environment jsdom
 * @jest-environment-options { "resources": "usable", "runScripts": "dangerously"}
 */
import { isBlob } from 'ut2';
import { getFileBlob } from '../src';
import { ResponseMethod, createSpyAjax, setResponseMethod, setResponseStatus } from './fixtures/spyAjax';
import { createSpyConsole } from './fixtures/spyConsole';

const TIMEOUT = 60 * 1000;
const url = 'https://dummyimage.com/100x100';

const xhrMock = {
  open: jest.fn(),
  send: jest.fn(),
  setRequestHeader: jest.fn()
};
const spyAjax = createSpyAjax(xhrMock);

const spyConsoleError = createSpyConsole();

describe('getFileBlob', () => {
  beforeEach(() => {
    setResponseMethod(ResponseMethod.Load);
    setResponseStatus(200);
    spyConsoleError.mockClear();
  });

  afterAll(() => {
    setResponseMethod(ResponseMethod.Load);
    setResponseStatus(200);
    spyAjax.mockRestore();
    spyConsoleError.mockRestore();
  });

  it(
    'blob 对象，返回自身',
    async () => {
      const blob = await getFileBlob(new Blob(['hello world']));
      expect(isBlob(blob)).toBe(true);
    },
    TIMEOUT
  );

  it(
    '获取 url 图片文件 blob 对象',
    async () => {
      const blob = await getFileBlob(url);
      expect(isBlob(blob)).toBe(true);
    },
    TIMEOUT
  );

  it(
    '自定义请求配置项',
    async () => {
      const headers = { foo: 'a', bar: 'b' };
      await getFileBlob(url, { headers, data: 'abc' });
      expect(xhrMock.setRequestHeader).toBeCalledWith('foo', 'a');
      expect(xhrMock.setRequestHeader).toBeCalledWith('bar', 'b');
      expect(xhrMock.send).toBeCalledWith('abc');
    },
    TIMEOUT
  );

  it(
    'ajax 请求 url 失败',
    async () => {
      setResponseMethod(ResponseMethod.Error);
      expect(spyConsoleError).toBeCalledTimes(0);
      try {
        await getFileBlob(url);
      } catch (err) {
        expect(spyConsoleError).toBeCalledTimes(1);
      }
    },
    TIMEOUT
  );

  it(
    'ajax 请求成功，响应码非200/304',
    async () => {
      setResponseStatus(403);
      expect(spyConsoleError).toBeCalledTimes(0);
      try {
        await getFileBlob(url);
      } catch (err) {
        expect(spyConsoleError).toBeCalledTimes(1);
      }
    },
    TIMEOUT
  );
});
