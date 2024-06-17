/**
 * @jest-environment jsdom
 * @jest-environment-options { "resources": "usable", "runScripts": "dangerously"}
 */
const blobUrl = 'blob://xxx';
const url = 'https://dummyimage.com/200x300';
jest.mock('../src/utils/native.ts', () => {
  const originalModule = jest.requireActual('../src/utils/native.ts');

  return {
    ...originalModule,
    createObjectURL: jest.fn(() => blobUrl),
    revokeObjectURL: jest.fn()
  };
});
import { isBlob, isNumber, isString } from 'ut2';
import { getImageInfo } from '../src';
import { createObjectURL, revokeObjectURL } from '../src/utils/native';
import { ResponseMethod, createSpyAjax, setResponseMethod, setResponseStatus } from './fixtures/spyAjax';

const TIMEOUT = 60 * 1000;
const ERROR_MESSAGE = 'error';

let loadSuccess = true; // 控制图片加载成功 或 失败

// @ts-ignore
global.Image = class XImage extends Image {
  [x: string]: any;
  constructor() {
    super();

    setTimeout(() => {
      if (loadSuccess) {
        // @ts-ignore
        this.onload();
      } else {
        // @ts-ignore
        this.onerror(ERROR_MESSAGE);
      }
    }, 100);
  }

  width = 100;
  height = 100;
};

const xhrMock = {
  open: jest.fn(),
  send: jest.fn(),
  setRequestHeader: jest.fn()
};
const spyAjax = createSpyAjax(xhrMock);

const spyConsoleError = jest.spyOn(globalThis.console, 'error').mockImplementation(() => {});

describe('getImageInfo', () => {
  beforeEach(() => {
    loadSuccess = true;
    setResponseMethod(ResponseMethod.Load);
    setResponseStatus(200);
    // @ts-ignore
    createObjectURL.mockClear();
    // @ts-ignore
    revokeObjectURL.mockClear();
  });

  afterAll(() => {
    spyAjax.mockRestore();
    spyConsoleError.mockRestore();
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

      expect(createObjectURL).toHaveBeenCalledTimes(1);
      expect(revokeObjectURL).toHaveBeenCalledTimes(0);
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

      expect(createObjectURL).toHaveBeenCalledTimes(1);
      expect(revokeObjectURL).toHaveBeenCalledTimes(0);
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
        expect(createObjectURL).toHaveBeenCalledTimes(0);
        expect(revokeObjectURL).toHaveBeenCalledTimes(0);
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
        expect(createObjectURL).toHaveBeenCalledTimes(0);
        expect(revokeObjectURL).toHaveBeenCalledTimes(0);
      }
    },
    TIMEOUT
  );

  it(
    '加载失败',
    async () => {
      loadSuccess = false;
      try {
        const blob = new Blob(['hello world']);
        await getImageInfo(blob);
      } catch (err) {
        expect(err).toBe(ERROR_MESSAGE);
      }
    },
    TIMEOUT
  );
});
