/**
 * @jest-environment jsdom
 * @jest-environment-options { "resources": "usable", "runScripts": "dangerously"}
 */
import './fixtures/mock-native';
import { isBlob } from 'ut2';
import { loadImageWithBlob } from '../src';
import { ResponseMethod, createSpyAjax, setResponseMethod, setResponseStatus } from './fixtures/spyAjax';
import { createSpyConsoleError } from './fixtures/spyConsole';
import { mockImage, restoreImage, setImageLoadStatus } from './fixtures/mockImage';

const url = 'https://dummyimage.com/200x300';
const blobUrl = 'blob://xxx';
const TIMEOUT = 60 * 1000;

const xhrMock = {
  open: jest.fn(),
  send: jest.fn(),
  setRequestHeader: jest.fn()
};
const spyAjax = createSpyAjax(xhrMock);

const spyConsoleError = createSpyConsoleError();
mockImage();

describe('loadImageWithBlob', () => {
  beforeEach(() => {
    setImageLoadStatus(true);
    setResponseMethod(ResponseMethod.Load);
    setResponseStatus(200);
    spyConsoleError.mockClear();
  });

  afterAll(() => {
    spyAjax.mockRestore();
    spyConsoleError.mockRestore();
    restoreImage();
  });

  it(
    '加载 blob 图片',
    async () => {
      const { image, blob } = await loadImageWithBlob(new Blob(['hello world']));
      expect(image.src).toBe(blobUrl);
      expect(isBlob(blob)).toBe(true);
    },
    TIMEOUT
  );

  it(
    '加载 url 图片',
    async () => {
      const { image, blob } = await loadImageWithBlob(url);
      // url通过ajax请求转为blob格式
      expect(image.src).toBe(blobUrl);
      expect(isBlob(blob)).toBe(true);
    },
    TIMEOUT
  );

  it(
    '自定义请求配置项',
    async () => {
      const headers = { foo: 'a', bar: 'b' };
      await loadImageWithBlob(url, { headers, data: 'abc' });
      expect(xhrMock.setRequestHeader).toHaveBeenCalledWith('foo', 'a');
      expect(xhrMock.setRequestHeader).toHaveBeenCalledWith('bar', 'b');
      expect(xhrMock.send).toHaveBeenCalledWith('abc');
    },
    TIMEOUT
  );

  it(
    'ajax 请求失败',
    async () => {
      setResponseMethod(ResponseMethod.Error);
      try {
        await loadImageWithBlob(url);
      } catch (err) {
        // spy onerror没有返回错误信息
        expect(err).toBeUndefined();
        expect(spyConsoleError).toHaveBeenCalled();
      }
      expect(spyConsoleError).toHaveBeenCalled();
    },
    TIMEOUT
  );

  it(
    'ajax 请求成功，响应码非200/304',
    async () => {
      setResponseStatus(403);
      try {
        await loadImageWithBlob(url);
      } catch (err) {
        // Error: The file does not support get requests, responseStatus 403, 'https://dummyimage.com/200x300'.
        expect(err).toBeTruthy();
        expect(spyConsoleError).toHaveBeenCalled();
      }
    },
    TIMEOUT
  );

  it(
    '加载失败',
    async () => {
      setImageLoadStatus(false);
      try {
        const blob = new Blob(['hello world']);
        await loadImageWithBlob(blob);
      } catch (err) {
        // spy image error message
        expect(err).toBe('error');
        expect(spyConsoleError).toHaveBeenCalled();
      }
    },
    TIMEOUT
  );
});
