/**
 * @jest-environment jsdom
 */
jest.mock('../src/utils/native.ts', () => {
  const originalModule = jest.requireActual('../src/utils/native.ts');

  return {
    ...originalModule,
    createObjectURL: jest.fn(),
    revokeObjectURL: jest.fn()
  };
});
import { sleep } from 'ut2';
import { createSpyAjax } from './fixtures/spyAjax';
import { download } from '../src';

describe('download', () => {
  const xhrMock = {
    open: jest.fn(),
    send: jest.fn(),
    setRequestHeader: jest.fn()
  };
  const spyAjax = createSpyAjax(xhrMock);

  function makeAnchor(target: Record<string, any>) {
    const handler: Record<string, (...args: any[]) => void> = {};

    return {
      target,
      setAttribute: jest.fn((key, value) => (target[key] = value)),
      click: jest.fn().mockImplementation(() => {
        if (handler.click) {
          handler.click({ stopPropagation: jest.fn() });
        }
      }),
      remove: jest.fn(),
      style: {
        display: 'inline'
      },
      addEventListener: jest.fn().mockImplementation((fnName, cb) => {
        handler[fnName] = cb;
      }),
      removeEventListener: jest.fn()
    };
  }
  const anchor = makeAnchor({ href: '#', download: '' });
  const spyCreateElement = jest.spyOn(document, 'createElement').mockReturnValue(anchor as any);
  const spyAppendChild = jest.spyOn(document.body, 'appendChild').mockImplementation(() => jest.fn() as any);
  const spyRemoveChild = jest.spyOn(document.body, 'removeChild').mockImplementation(() => jest.fn() as any);

  afterAll(() => {
    spyAjax.mockRestore();
    spyCreateElement.mockRestore();
    spyAppendChild.mockRestore();
    spyRemoveChild.mockRestore();
  });

  it('basic', async () => {
    // string
    const str = 'hello world';
    await download(str);
    await download(str, 'text.txt');
    await download('data:text/plain,hello%20world', 'text.txt');
    await download(new Blob([str]), 'text.txt');
    await download('/robots.txt', { dataType: 'url' });
    const arr = new Uint8Array(str.length);
    str.split('').forEach((s, i) => (arr[i] = str.charCodeAt(i)));
    await download(arr, 'text.txt');

    // html
    await download(document.documentElement.outerHTML, { fileName: 'test.html', type: 'html/plain' });
    await download(new Blob([str.bold()]), { fileName: 'test.html', type: 'html/plain' });
    await download('/index.html', { dataType: 'url', type: 'html/plain' });

    // binary
    await download('/test.jpeg', { dataType: 'url' });

    // blob url
    await download('blob: http:xx/fas');
  });

  it('transformRequest & transformResponse', async () => {
    await download('/test.txt', {
      dataType: 'url',
      transformRequest(options) {
        return {
          ...options,
          method: 'post',
          data: 'a=1&b=2'
        };
      },
      transformResponse() {
        return '' as any;
      }
    });

    expect(xhrMock.open).toHaveBeenCalledWith('post', '/test.txt', true, null, null);
    expect(xhrMock.send).toHaveBeenCalledWith('a=1&b=2');
    expect(xhrMock.setRequestHeader).not.toHaveBeenCalled();

    await download('/test.txt', {
      dataType: 'url',
      transformRequest: async (options) => {
        await sleep(100);
        return {
          ...options,
          method: 'post',
          data: 'a=1&b=2'
        };
      },
      transformResponse: async (res) => {
        return res;
      }
    });

    expect(xhrMock.open).toHaveBeenCalledWith('post', '/test.txt', true, null, null);
    expect(xhrMock.send).toHaveBeenCalledWith('a=1&b=2');
    expect(xhrMock.setRequestHeader).not.toHaveBeenCalled();
  });

  it('mock ie', async () => {
    const msSaveBlobFn = jest.fn();
    // @ts-ignore
    navigator.msSaveBlob = msSaveBlobFn;

    await download('/test.txt');
    expect(msSaveBlobFn).toHaveBeenCalled();
  });
});
