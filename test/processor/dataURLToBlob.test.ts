/**
 * @jest-environment jsdom
 */
import { dataURLToBlob } from '../../src';

describe('dataURLToBlob', () => {
  it('should be defined', () => {
    expect(dataURLToBlob).toBeDefined();
  });

  const dataurl = 'data:text/html;base64,PGEgaWQ9ImEiPjxiIGlkPSJiIj5oZXkhPC9iPjwvYT4=';
  const dataurl2 = 'data:text/plain;base64,PGEgaWQ9ImEiPjxiIGlkPSJiIj5oZXkhPC9iPjwvYT4=';

  it('simple', () => {
    const data = dataURLToBlob(dataurl);
    const data2 = dataURLToBlob(dataurl2);
    expect(Object.prototype.toString.call(data)).toBe('[object Blob]');
    expect(data.size).toBe(32);
    expect(data.type).toBe('text/html');
    expect(data2.size).toBe(32);
    expect(data2.type).toBe('text/plain');
  });
});
