/**
 * @jest-environment jsdom
 */
import { blobToDataURL } from '../../src';

describe('blobToDataURL', () => {
  // ref: https://developer.mozilla.org/zh-CN/docs/Web/API/Blob/Blob#示例
  const aFileParts = ['<a id="a"><b id="b">hey!</b></a>']; // 一个包含DOMString的数组
  const htmlBlob = new Blob(aFileParts, { type: 'text/html' }); // 得到 blob

  it('text/html', async () => {
    const data = await blobToDataURL(htmlBlob);
    expect(data).toBe('data:text/html;base64,PGEgaWQ9ImEiPjxiIGlkPSJiIj5oZXkhPC9iPjwvYT4=');
  });

  const textBlob = new Blob(aFileParts, { type: 'text/plain' });

  it('text/plain', async () => {
    const data = await blobToDataURL(textBlob);
    expect(data).toBe('data:text/plain;base64,PGEgaWQ9ImEiPjxiIGlkPSJiIj5oZXkhPC9iPjwvYT4=');
  });

  it('error', async () => {
    let errMsg = '';
    // @ts-ignore
    const errorSpy = jest.spyOn(globalThis, 'FileReader').mockImplementation(function () {
      this.readAsDataURL = () => {
        setTimeout(() => {
          this.onerror(new Error('mock error'));
        }, 100);
      };
    });

    try {
      // @ts-ignore
      await blobToDataURL('');
    } catch (err) {
      // console.log(err);
      errMsg = err.message;
    }

    expect(errMsg).toBe('mock error');

    errorSpy.mockRestore();
  });

  // TODO: dom select file transform
  // TODO: other type e.g zip/rap/...
});
