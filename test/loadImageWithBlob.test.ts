/**
 * @jest-environment jsdom
 * @jest-environment-options { "resources": "usable", "runScripts": "dangerously"}
 */
import { isBlob, sleep } from 'ut2';
import { loadImageWithBlob } from '../src';

const TIMEOUT = 60 * 1000;
const ERROR_MESSAGE = 'error';

const blobUrl = 'blob://xxx';
const url = 'https://dummyimage.com/200x300';

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

// 参考: https://stackoverflow.com/questions/28584773/xmlhttprequest-testing-in-jest
enum ResponseMethod {
  Load,
  Error
}
// eslint-disable-next-line prefer-const
let resMethod = ResponseMethod.Load; // 将要触发的响应方法
// eslint-disable-next-line prefer-const
let responseStatus = 200; // 将要触发的响应状态码
const xhrMock = {
  open: jest.fn(),
  send: jest.fn(),
  setRequestHeader: jest.fn()
};
const spyAjax = jest.spyOn(window, 'XMLHttpRequest').mockImplementation(() => {
  const methods: Record<string, () => void> = {};

  async function send() {
    methods.loadstart?.();

    if (resMethod === ResponseMethod.Error) {
      methods.error();
    } else {
      await sleep(100);

      const res = {
        target: {
          response: new Blob(['hello word']),
          status: responseStatus
        }
      };
      // @ts-ignore
      methods.load(res);
    }
    methods.loadend?.();
  }

  return {
    addEventListener: jest.fn().mockImplementation(function (fnName, fn) {
      methods[fnName] = fn;
    }),
    open: xhrMock.open,
    removeEventListener: jest.fn(),
    send: xhrMock.send.mockImplementation(send),
    setRequestHeader: xhrMock.setRequestHeader
  } as any;
});

const spyConsoleError = jest.spyOn(globalThis.console, 'error').mockImplementation(() => {});

describe('loadImageWithBlob', () => {
  beforeEach(() => {
    loadSuccess = true;
    resMethod = ResponseMethod.Load;
    responseStatus = 200;
    URL.createObjectURL = jest.fn(() => blobUrl);
    URL.revokeObjectURL = jest.fn();
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
      expect(URL.createObjectURL).toBeCalledTimes(1);
      expect(URL.revokeObjectURL).toBeCalledTimes(1);
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
      expect(URL.createObjectURL).toBeCalledTimes(1);
      expect(URL.revokeObjectURL).toBeCalledTimes(1);
    },
    TIMEOUT
  );

  it(
    '缓存上一次加载成功的结果，连续请求同一个图片资源，不再重复加载',
    async () => {
      await loadImageWithBlob(url);
      expect(URL.createObjectURL).toBeCalledTimes(1);
      expect(URL.revokeObjectURL).toBeCalledTimes(1);

      // 加载同一个图片，不再重新加载图片，通过缓存获取
      await loadImageWithBlob(url);
      expect(URL.createObjectURL).toBeCalledTimes(1);
      expect(URL.revokeObjectURL).toBeCalledTimes(1);
    },
    TIMEOUT
  );

  it(
    '只缓存最近一次成功结果，失败结果不会缓存',
    async () => {
      const blob = new Blob(['hello world']);
      await loadImageWithBlob(blob);
      expect(URL.createObjectURL).toBeCalledTimes(1);
      expect(URL.revokeObjectURL).toBeCalledTimes(1);

      loadSuccess = false;
      try {
        await loadImageWithBlob(new Blob(['hi']));
      } catch (err) {
        expect(err).toBe(ERROR_MESSAGE);
      }
      loadSuccess = true;

      await loadImageWithBlob(blob);
      expect(URL.createObjectURL).toBeCalledTimes(2);
      expect(URL.revokeObjectURL).toBeCalledTimes(2);
    },
    TIMEOUT
  );

  it(
    '不使用缓存',
    async () => {
      await loadImageWithBlob(url, false);
      expect(URL.createObjectURL).toBeCalledTimes(1);
      expect(URL.revokeObjectURL).toBeCalledTimes(1);

      // 连续请求同一个资源，还是会发起请求
      await loadImageWithBlob(url, false);
      expect(URL.createObjectURL).toBeCalledTimes(2);
      expect(URL.revokeObjectURL).toBeCalledTimes(2);
    },
    TIMEOUT
  );

  it(
    'ajax 请求 url 失败',
    async () => {
      resMethod = ResponseMethod.Error;
      try {
        await loadImageWithBlob(url, false);
      } catch (err) {
        expect(URL.createObjectURL).toBeCalledTimes(0);
        expect(URL.revokeObjectURL).toBeCalledTimes(0);
      }
    },
    TIMEOUT
  );

  it(
    'ajax 请求成功，响应码非200/304',
    async () => {
      responseStatus = 403;
      try {
        await loadImageWithBlob(url, false);
      } catch (err) {
        expect(URL.createObjectURL).toBeCalledTimes(0);
        expect(URL.revokeObjectURL).toBeCalledTimes(0);
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
        await loadImageWithBlob(blob);
      } catch (err) {
        expect(err).toBe(ERROR_MESSAGE);
      }
    },
    TIMEOUT
  );
});
