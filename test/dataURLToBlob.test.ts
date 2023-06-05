/**
 * @jest-environment jsdom
 */
import { fileReader, dataURLToBlob } from '../src';

describe('dataURLToBlob', () => {
  const dataurl = 'data:text/html;base64,PGEgaWQ9ImEiPjxiIGlkPSJiIj5oZXkhPC9iPjwvYT4=';
  const dataurl2 = 'data:text/plain;base64,PGEgaWQ9ImEiPjxiIGlkPSJiIj5oZXkhPC9iPjwvYT4=';

  it('base 64', () => {
    const data = dataURLToBlob(dataurl);
    const data2 = dataURLToBlob(dataurl2);
    expect(Object.prototype.toString.call(data)).toBe('[object Blob]');
    expect(data.size).toBe(32);
    expect(data.type).toBe('text/html');
    expect(data2.size).toBe(32);
    expect(data2.type).toBe('text/plain');
  });

  it('no base64', async () => {
    const data = dataURLToBlob('data:text/plain,hello%20world');
    expect(data.type).toBe('text/plain');
    expect(data.size).toBe(11);

    const text = await fileReader(data, 'text');
    expect(text).toBe('hello world');
  });

  it('more dataURL string', () => {
    const dataurl = 'data:text/plain;charset=utf-8;base64,w4FydsOtenTFsXLFkXTDvGvDtnJmw7p0w7Nnw6lwLg==';
    const data = dataURLToBlob(dataurl);

    expect(data.type).toBe('text/plain');
    expect(data.size).toBe(31);
  });
});
