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
      expect(createObjectURL).toHaveBeenCalledTimes(1);
      expect(revokeObjectURL).toHaveBeenCalledTimes(0);
    },
    TIMEOUT
  );

  it(
    '加载 url 图片',
    async () => {
      const image = await loadImage(url);
      expect(image.crossOrigin).toBe('anonymous');
      expect(image.src).toBe(url);
    },
    TIMEOUT
  );

  it(
    '加载失败',
    async () => {
      expect(consoleError).toHaveBeenCalledTimes(0);
      loadSuccess = false;
      try {
        await loadImage(url);
      } catch (err) {
        expect(err).toBe(ERROR_MESSAGE);
      }
      expect(consoleError).toHaveBeenCalledTimes(1);

      try {
        await loadImage(new Blob(['hello world']));
      } catch (err) {
        expect(err).toBe(ERROR_MESSAGE);
      }
      expect(consoleError).toHaveBeenCalledTimes(2);
    },
    TIMEOUT
  );
});
