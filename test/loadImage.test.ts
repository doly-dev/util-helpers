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

import { loadImage } from '../src';
import { createObjectURL, revokeObjectURL } from '../src/utils/native';

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

const consoleError = jest.fn();
const spyConsoleError = jest.spyOn(globalThis.console, 'error').mockImplementation(consoleError);

describe('loadImage', () => {
  beforeEach(() => {
    // @ts-ignore
    createObjectURL.mockClear();
    // @ts-ignore
    revokeObjectURL.mockClear();
    consoleError.mockClear();
  });

  afterAll(() => {
    spyConsoleError.mockRestore();
  });

  it(
    '加载 blob 图片',
    async () => {
      const image = await loadImage(new Blob(['hello world']));
      expect(image.crossOrigin).not.toBe('anonymous');
      expect(image.src).toBe(blobUrl);
      expect(createObjectURL).toBeCalledTimes(1);
      expect(revokeObjectURL).toBeCalledTimes(0);
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
      expect(createObjectURL).toBeCalledTimes(1);
      expect(revokeObjectURL).toBeCalledTimes(0);

      // 加载同一个图片，不再重新加载图片，通过缓存获取
      await loadImage(blob);
      expect(createObjectURL).toBeCalledTimes(1);
      expect(revokeObjectURL).toBeCalledTimes(0);
    },
    TIMEOUT
  );

  it(
    '只缓存最近一次成功结果，失败结果不会缓存',
    async () => {
      const blob = new Blob(['hello world']);
      await loadImage(blob);
      expect(createObjectURL).toBeCalledTimes(1);
      expect(revokeObjectURL).toBeCalledTimes(0);
      expect(consoleError).toBeCalledTimes(0);

      loadSuccess = false;
      try {
        await loadImage(new Blob(['hi']));
      } catch (err) {
        expect(err).toBe(ERROR_MESSAGE);
      }
      expect(createObjectURL).toBeCalledTimes(2);
      expect(revokeObjectURL).toBeCalledTimes(1);
      expect(consoleError).toBeCalledTimes(1);

      loadSuccess = true;

      await loadImage(blob);
      expect(createObjectURL).toBeCalledTimes(2);
      expect(revokeObjectURL).toBeCalledTimes(1);
    },
    TIMEOUT
  );

  it(
    '不使用缓存',
    async () => {
      const blob = new Blob(['hello world']);
      await loadImage(blob, false);
      expect(createObjectURL).toBeCalledTimes(1);
      expect(revokeObjectURL).toBeCalledTimes(0);

      // 连续请求同一个资源，还是会发起请求
      await loadImage(blob, false);
      expect(createObjectURL).toBeCalledTimes(2);
      expect(revokeObjectURL).toBeCalledTimes(0);
    },
    TIMEOUT
  );

  it(
    '加载失败',
    async () => {
      expect(consoleError).toBeCalledTimes(0);
      loadSuccess = false;
      try {
        await loadImage(url);
      } catch (err) {
        expect(err).toBe(ERROR_MESSAGE);
      }
      expect(consoleError).toBeCalledTimes(1);
    },
    TIMEOUT
  );
});
