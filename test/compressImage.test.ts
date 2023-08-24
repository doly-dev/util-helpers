/**
 * @jest-environment jsdom
 * @jest-environment-options { "resources": "usable", "runScripts": "dangerously"}
 */
import { isBlob, sleep } from 'ut2';
import { compressImage } from '../src';

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
    '导出不同格式',
    async () => {
      const blob = await compressImage(url);
      expect(isBlob(blob)).toBe(true);

      const mockDataUrl = 'data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';
      const str = await compressImage(url, {
        format: 'dataURL',
        beforeDraw(info) {
          // @ts-ignore
          info.canvas.toDataURL.mockReturnValueOnce(mockDataUrl);
        }
      });
      expect(str).toBe(mockDataUrl);
    },
    TIMEOUT
  );

  it(
    '自定义图片宽高',
    async () => {
      const blob = await compressImage(url, {
        width: 100,
        height: 100
      });
      expect(isBlob(blob)).toBe(true);
    },
    TIMEOUT
  );

  it(
    '自定义画布宽高',
    async () => {
      const blob = await compressImage(url, {
        canvasWidth: 100,
        canvasHeight: 100
      });
      expect(isBlob(blob)).toBe(true);
    },
    TIMEOUT
  );

  it(
    '通过方法定义画布宽高',
    async () => {
      const blob = await compressImage(url, {
        canvasWidth: (info) => info.image.width + 10,
        canvasHeight: (info) => info.image.height + 10
      });
      expect(isBlob(blob)).toBe(true);
    },
    TIMEOUT
  );

  it(
    '设置背景色',
    async () => {
      const blob = await compressImage(url, {
        background: '#fff'
      });
      expect(isBlob(blob)).toBe(true);

      // 不设置背景色
      const blob2 = await compressImage(url, {
        background: 'none'
      });
      expect(isBlob(blob2)).toBe(true);
    },
    TIMEOUT
  );

  it(
    '设置旋转和偏移值',
    async () => {
      const blob = await compressImage(url, {
        rotate: 180,
        offset: [5, 5]
      });
      expect(isBlob(blob)).toBe(true);
    },
    TIMEOUT
  );

  it(
    '通过方法定义偏移值',
    async () => {
      const blob = await compressImage(url, {
        offset(info) {
          return [info.image.width / 2, info.image.height / 2];
        }
      });
      expect(isBlob(blob)).toBe(true);
    },
    TIMEOUT
  );

  it(
    '钩子方法 beforeCompress/beforeDraw/afterDraw',
    async () => {
      let beforeCompressArgs: any[] = [];
      let beforeDrawArgs: any[] = [];
      let afterDrawArgs: any[] = [];

      const beforeCompress = jest.fn((...args) => {
        beforeCompressArgs = args;
      });
      const beforeDraw = jest.fn((...args) => {
        beforeDrawArgs = args;
      });
      const afterDraw = jest.fn((...args) => {
        afterDrawArgs = args;
      });

      await compressImage(url, {
        beforeCompress,
        beforeDraw,
        afterDraw
      });

      expect(beforeCompress).toBeCalledTimes(1);
      expect(beforeDraw).toBeCalledTimes(1);
      expect(afterDraw).toBeCalledTimes(1);

      expect(beforeCompressArgs[0].image).toBeDefined();
      expect(beforeCompressArgs[0].blob).toBeDefined();
      expect(beforeCompressArgs[1].beforeCompress).toBeDefined();
      expect(beforeCompressArgs[1].beforeDraw).toBeDefined();
      expect(beforeCompressArgs[1].afterDraw).toBeDefined();

      expect(beforeDrawArgs[0].image).toBeDefined();
      expect(beforeDrawArgs[0].blob).toBeDefined();
      expect(beforeDrawArgs[0].canvas).toBeDefined();
      expect(beforeDrawArgs[0].context).toBeDefined();
      expect(beforeDrawArgs[1].beforeCompress).toBeDefined();
      expect(beforeDrawArgs[1].beforeDraw).toBeDefined();
      expect(beforeDrawArgs[1].afterDraw).toBeDefined();

      expect(afterDrawArgs[0].image).toBeDefined();
      expect(afterDrawArgs[0].blob).toBeDefined();
      expect(afterDrawArgs[0].canvas).toBeDefined();
      expect(afterDrawArgs[0].context).toBeDefined();
      expect(afterDrawArgs[1].beforeCompress).toBeDefined();
      expect(afterDrawArgs[1].beforeDraw).toBeDefined();
      expect(afterDrawArgs[1].afterDraw).toBeDefined();
    },
    TIMEOUT
  );
});
