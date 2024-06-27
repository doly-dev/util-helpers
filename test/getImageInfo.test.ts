/**
 * @jest-environment jsdom
 * @jest-environment-options { "resources": "usable", "runScripts": "dangerously"}
 */
import './fixtures/mock-native';
import { isBlob, isNumber, isString } from 'ut2';
import { getImageInfo } from '../src';
import { ResponseMethod, createSpyAjax, setResponseMethod, setResponseStatus } from './fixtures/spyAjax';
import { createSpyConsoleError } from './fixtures/spyConsole';
import { mockImage, restoreImage, setImageLoadStatus } from './fixtures/mockImage';

const url = 'https://dummyimage.com/200x300';
const TIMEOUT = 60 * 1000;

const xhrMock = {
  open: jest.fn(),
  send: jest.fn(),
  setRequestHeader: jest.fn()
};
const spyAjax = createSpyAjax(xhrMock);
const spyConsoleError = createSpyConsoleError();
mockImage();

describe('getImageInfo', () => {
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
    '获取 blob 图片信息',
    async () => {
      const imageInfo = await getImageInfo(new Blob(['hello world']));
      expect(isNumber(imageInfo.width)).toBe(true);
      expect(isNumber(imageInfo.height)).toBe(true);
      expect(isBlob(imageInfo.blob)).toBe(true);
      expect(isString(imageInfo.size)).toBe(true);
      expect(isString(imageInfo.contrast)).toBe(true);
      expect(isString(imageInfo.measure)).toBe(true);
      expect(isNumber(imageInfo.bytes)).toBe(true);
    },
    TIMEOUT
  );

  it(
    '获取 url 图片信息',
    async () => {
      const imageInfo = await getImageInfo(url);
      expect(isNumber(imageInfo.width)).toBe(true);
      expect(isNumber(imageInfo.height)).toBe(true);
      expect(isBlob(imageInfo.blob)).toBe(true);
      expect(isString(imageInfo.size)).toBe(true);
      expect(isString(imageInfo.contrast)).toBe(true);
      expect(isString(imageInfo.measure)).toBe(true);
      expect(isNumber(imageInfo.bytes)).toBe(true);
    },
    TIMEOUT
  );

  it(
    '自定义请求配置项',
    async () => {
      const headers = { foo: 'a', bar: 'b' };
      await getImageInfo(url, { headers, data: 'abc' });
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
        await getImageInfo(url);
      } catch (err) {
        // spy onerror没有返回错误信息
        expect(err).toBeUndefined();
        expect(spyConsoleError).toHaveBeenCalled();
      }
    },
    TIMEOUT
  );

  it(
    'ajax 请求成功，响应码非200/304',
    async () => {
      setResponseStatus(403);
      try {
        await getImageInfo(url);
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
        await getImageInfo(blob);
      } catch (err) {
        // spy image error message
        expect(err).toBe('error');
        expect(spyConsoleError).toHaveBeenCalled();
      }
    },
    TIMEOUT
  );
});
