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

import { isBlob } from 'ut2';
import { loadImageWithBlob } from '../src';
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

const consoleError = jest.fn();
const spyConsoleError = jest.spyOn(globalThis.console, 'error').mockImplementation(consoleError);

describe('loadImageWithBlob', () => {
  beforeEach(() => {
    loadSuccess = true;
    setResponseMethod(ResponseMethod.Load);
    setResponseStatus(200);
    consoleError.mockClear();
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
    '加载 blob 图片',
    async () => {
      const { image, blob } = await loadImageWithBlob(new Blob(['hello world']));
      expect(image.src).toBe(blobUrl);
      expect(isBlob(blob)).toBe(true);
      expect(createObjectURL).toBeCalledTimes(1);
      expect(revokeObjectURL).toBeCalledTimes(0);
    },
    TIMEOUT
  );

  it(
    '加载 url 图片',
    async () => {
      const { image, blob } = await loadImageWithBlob(url, false);
      // url通过ajax请求转为blob格式
      expect(image.src).toBe(blobUrl);
      expect(isBlob(blob)).toBe(true);
      expect(createObjectURL).toBeCalledTimes(1);
      expect(revokeObjectURL).toBeCalledTimes(0);
    },
    TIMEOUT
  );

  it(
    '缓存上一次加载成功的结果，连续请求同一个图片资源，不再重复加载',
    async () => {
      await loadImageWithBlob(url);
      expect(createObjectURL).toBeCalledTimes(1);
      expect(revokeObjectURL).toBeCalledTimes(0);

      // 加载同一个图片，不再重新加载图片，通过缓存获取
      await loadImageWithBlob(url);
      expect(createObjectURL).toBeCalledTimes(1);
      expect(revokeObjectURL).toBeCalledTimes(0);
    },
    TIMEOUT
  );

  it(
    '只缓存最近一次成功结果，失败结果不会缓存',
    async () => {
      const blob = new Blob(['hello world']);
      await loadImageWithBlob(blob);
      expect(createObjectURL).toBeCalledTimes(1);
      expect(revokeObjectURL).toBeCalledTimes(0);

      loadSuccess = false;
      try {
        await loadImageWithBlob(new Blob(['hi']));
      } catch (err) {
        expect(err).toBe(ERROR_MESSAGE);
      }
      expect(createObjectURL).toBeCalledTimes(2);
      expect(revokeObjectURL).toBeCalledTimes(1);

      loadSuccess = true;

      await loadImageWithBlob(blob);
      expect(createObjectURL).toBeCalledTimes(2);
      expect(revokeObjectURL).toBeCalledTimes(1);
    },
    TIMEOUT
  );

  it(
    '不使用缓存',
    async () => {
      await loadImageWithBlob(url, false);
      expect(createObjectURL).toBeCalledTimes(1);
      expect(revokeObjectURL).toBeCalledTimes(0);

      // 连续请求同一个资源，还是会发起请求
      await loadImageWithBlob(url, false);
      expect(createObjectURL).toBeCalledTimes(2);
      expect(revokeObjectURL).toBeCalledTimes(0);
    },
    TIMEOUT
  );

  it(
    '自定义请求配置项',
    async () => {
      const headers = { foo: 'a', bar: 'b' };
      await loadImageWithBlob(url, false, { headers, data: 'abc' });
      expect(xhrMock.setRequestHeader).toBeCalledWith('foo', 'a');
      expect(xhrMock.setRequestHeader).toBeCalledWith('bar', 'b');
      expect(xhrMock.send).toBeCalledWith('abc');
    },
    TIMEOUT
  );

  it(
    'ajax 请求 url 失败',
    async () => {
      expect(consoleError).toBeCalledTimes(0);
      setResponseMethod(ResponseMethod.Error);
      try {
        await loadImageWithBlob(url, false);
      } catch (err) {
        expect(createObjectURL).toBeCalledTimes(0);
        expect(revokeObjectURL).toBeCalledTimes(0);
      }
      expect(consoleError).toBeCalledTimes(1);
    },
    TIMEOUT
  );

  it(
    'ajax 请求成功，响应码非200/304',
    async () => {
      expect(consoleError).toBeCalledTimes(0);
      setResponseStatus(403);
      try {
        await loadImageWithBlob(url, false);
      } catch (err) {
        expect(createObjectURL).toBeCalledTimes(0);
        expect(revokeObjectURL).toBeCalledTimes(0);
      }
      expect(consoleError).toBeCalledTimes(1);
    },
    TIMEOUT
  );

  it(
    '加载失败',
    async () => {
      expect(consoleError).toBeCalledTimes(0);
      loadSuccess = false;
      try {
        const blob = new Blob(['hello world']);
        await loadImageWithBlob(blob);
      } catch (err) {
        expect(err).toBe(ERROR_MESSAGE);
      }
      expect(consoleError).toBeCalledTimes(1);
    },
    TIMEOUT
  );
});
