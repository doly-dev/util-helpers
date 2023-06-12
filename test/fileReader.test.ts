/**
 * @jest-environment jsdom
 */
import { isArrayBuffer } from 'ut2';
import { fileReader } from '../src';

describe('fileReader', () => {
  it('correct', async () => {
    const textBlob = new Blob(['hello world'], { type: 'text/plain' });
    const data = await fileReader(textBlob);
    expect(data).toBe('data:text/plain;base64,aGVsbG8gd29ybGQ=');

    const data2 = await fileReader(textBlob);
    expect(data2).toBe('data:text/plain;base64,aGVsbG8gd29ybGQ=');

    const data3 = await fileReader(textBlob, 'text');
    expect(data3).toBe('hello world');

    const data4 = await fileReader(textBlob, 'arrayBuffer');
    expect(data4.byteLength).toBe(11);
    expect(isArrayBuffer(data4)).toBe(true);

    // deprecated
    const data5 = await fileReader(textBlob, 'binaryString');
    expect(data5).toBe('hello world');
  });

  it('incorrect', async () => {
    const textBlob = new Blob(['hello world'], { type: 'text/plain' });
    // 如果method方法不存在，默认为 dataURL
    // @ts-ignore
    const data = await fileReader(textBlob, 'unsupport');
    expect(data).toBe('data:text/plain;base64,aGVsbG8gd29ybGQ=');
  });

  it('error', async () => {
    let errMsg = '';
    // @ts-ignore
    const errorSpy = jest.spyOn(globalThis, 'FileReader').mockImplementation(function () {
      // @ts-ignore
      this.readAsDataURL = () => {
        setTimeout(() => {
          // @ts-ignore
          this.onerror(new Error('mock error'));
        }, 100);
      };
    });

    try {
      // @ts-ignore
      await fileReader('');
    } catch (err: any) {
      // console.log(err);
      errMsg = err.message;
    }

    expect(errMsg).toBe('mock error');

    errorSpy.mockRestore();
  });

  // TODO: dom select file transform
  // TODO: other type e.g zip/rap/...
});
