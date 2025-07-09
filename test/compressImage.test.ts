/**
 * @jest-environment jsdom
 * @jest-environment-options { "resources": "usable", "runScripts": "dangerously"}
 */
import './fixtures/mock-native';
import { isBlob } from 'ut2';
import { ResponseMethod, createSpyAjax, setResponseMethod } from './fixtures/spyAjax';
import { compressImage } from '../src';
import { mockImage, restoreImage, setImageLoadStatus } from './fixtures/mockImage';
import { createSpyConsole } from './fixtures/spyConsole';

const url = 'https://dummyimage.com/200x300';
const TIMEOUT = 60 * 1000;

const xhrMock = {
  open: jest.fn(),
  send: jest.fn(),
  setRequestHeader: jest.fn()
};
const spyAjax = createSpyAjax(xhrMock);

const spyConsoleError = createSpyConsole();
mockImage();

describe('loadImageWithBlob', () => {
  beforeEach(() => {
    setImageLoadStatus(true);
    setResponseMethod(ResponseMethod.Load);
  });

  afterAll(() => {
    spyAjax.mockRestore();
    spyConsoleError.mockRestore();
    restoreImage();
  });

  it(
    '导出不同格式',
    async () => {
      const blob = await compressImage(url);
      expect(isBlob(blob)).toBe(true);

      const mockDataUrl = 'data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';
      const str = await compressImage(url, {
        quality: 0.7,
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

      // 设置背景透明
      const blob3 = await compressImage(url, {
        background: 'transparent' // 同 none
      });
      expect(isBlob(blob3)).toBe(true);
    },
    TIMEOUT
  );

  it(
    'png 半透明图片',
    async () => {
      const blob = await compressImage(url, {
        background: 'transparent',
        type: 'image/png'
      });
      expect(isBlob(blob)).toBe(true);
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

      expect(beforeCompress).toHaveBeenCalledTimes(1);
      expect(beforeDraw).toHaveBeenCalledTimes(1);
      expect(afterDraw).toHaveBeenCalledTimes(1);

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

  it(
    '自定义请求配置项',
    async () => {
      const headers = { foo: 'a', bar: 'b' };
      await compressImage(url, { ajaxOptions: { headers, data: 'abc' } });
      expect(xhrMock.setRequestHeader).toHaveBeenCalledWith('foo', 'a');
      expect(xhrMock.setRequestHeader).toHaveBeenCalledWith('bar', 'b');
      expect(xhrMock.send).toHaveBeenCalledWith('abc');
    },
    TIMEOUT
  );
});
