/**
 * @jest-environment jsdom
 * @jest-environment-options { "resources": "usable", "runScripts": "dangerously"}
 */
import { loadImage } from '../src';

const TIMEOUT = 60 * 1000;
const ERROR_MESSAGE = 'error';

const blobUrl = 'blob://xxx';
const url = 'https://dummyimage.com/200x300';

let loadSuccess = true; // 控制图片加载成功 或 失败

// @ts-ignore
global.Image = class {
  [x: string]: any;
  constructor() {
    setTimeout(() => {
      if (loadSuccess) {
        this.onload();
      } else {
        this.onerror(ERROR_MESSAGE);
      }
    }, 100);
  }
};

describe('loadImageWithBlob', () => {
  beforeEach(() => {
    URL.createObjectURL = jest.fn(() => blobUrl);
    URL.revokeObjectURL = jest.fn();
  });

  it(
    '加载 blob 图片',
    async () => {
      const image = await loadImage(new Blob(['hello world']));
      expect(image.crossOrigin).toBeUndefined();
      expect(image.src).toBe(blobUrl);
      expect(URL.createObjectURL).toBeCalledTimes(1);
      expect(URL.revokeObjectURL).toBeCalledTimes(1);
    },
    TIMEOUT
  );

  it(
    '加载 url 图片',
    async () => {
      const image = await loadImage(url, false);
      expect(image.crossOrigin).toBe('anonymous');
      expect(image.src).toBe(url);
    },
    TIMEOUT
  );

  it(
    '缓存上一次加载成功的结果，连续请求同一个图片资源，不再重复加载',
    async () => {
      const blob = new Blob(['hello world']);
      await loadImage(blob);
      expect(URL.createObjectURL).toBeCalledTimes(1);
      expect(URL.revokeObjectURL).toBeCalledTimes(1);

      // 加载同一个图片，不再重新加载图片，通过缓存获取
      await loadImage(blob);
      expect(URL.createObjectURL).toBeCalledTimes(1);
      expect(URL.revokeObjectURL).toBeCalledTimes(1);
    },
    TIMEOUT
  );

  it(
    '只缓存最近一次成功结果，失败结果不会缓存',
    async () => {
      const blob = new Blob(['hello world']);
      await loadImage(blob);
      expect(URL.createObjectURL).toBeCalledTimes(1);
      expect(URL.revokeObjectURL).toBeCalledTimes(1);

      loadSuccess = false;
      try {
        await loadImage(new Blob(['hi']));
      } catch (err) {
        expect(err).toBe(ERROR_MESSAGE);
      }
      loadSuccess = true;

      await loadImage(blob);
      expect(URL.createObjectURL).toBeCalledTimes(2);
      expect(URL.revokeObjectURL).toBeCalledTimes(2);
    },
    TIMEOUT
  );

  it(
    '不使用缓存',
    async () => {
      const blob = new Blob(['hello world']);
      await loadImage(blob, false);
      expect(URL.createObjectURL).toBeCalledTimes(1);
      expect(URL.revokeObjectURL).toBeCalledTimes(1);

      // 连续请求同一个资源，还是会发起请求
      await loadImage(blob, false);
      expect(URL.createObjectURL).toBeCalledTimes(2);
      expect(URL.revokeObjectURL).toBeCalledTimes(2);
    },
    TIMEOUT
  );

  it(
    '加载失败',
    async () => {
      const spyConsoleError = jest.spyOn(globalThis.console, 'error').mockImplementation(() => {});
      loadSuccess = false;
      try {
        const blob = new Blob(['hello world']);
        await loadImage(blob);
      } catch (err) {
        expect(err).toBe(ERROR_MESSAGE);
      }
      spyConsoleError.mockRestore();
    },
    TIMEOUT
  );
});
