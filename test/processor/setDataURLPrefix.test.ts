import { setDataURLPrefix } from '../../src';

describe('setDataURLPrefix', () => {
  const data = 'PGEgaWQ9ImEiPjxiIGlkPSJiIj5oZXkhPC9iPjwvYT4=';

  it('prefix', () => {
    expect(setDataURLPrefix(data)).toBe('data:image/png;base64,PGEgaWQ9ImEiPjxiIGlkPSJiIj5oZXkhPC9iPjwvYT4=');
    expect(setDataURLPrefix(data, 'image/png', false)).toBe('data:image/png,PGEgaWQ9ImEiPjxiIGlkPSJiIj5oZXkhPC9iPjwvYT4=');
    expect(setDataURLPrefix(data, 'image/jpg')).toBe('data:image/jpg;base64,PGEgaWQ9ImEiPjxiIGlkPSJiIj5oZXkhPC9iPjwvYT4=');
    expect(setDataURLPrefix(data, 'text/html')).toBe('data:text/html;base64,PGEgaWQ9ImEiPjxiIGlkPSJiIj5oZXkhPC9iPjwvYT4=');
    expect(setDataURLPrefix(data, 'text/plain')).toBe('data:text/plain;base64,PGEgaWQ9ImEiPjxiIGlkPSJiIj5oZXkhPC9iPjwvYT4=');
    expect(setDataURLPrefix(data, '')).toBe('data:;base64,PGEgaWQ9ImEiPjxiIGlkPSJiIj5oZXkhPC9iPjwvYT4=');
    expect(setDataURLPrefix(data, '', false)).toBe('data:,PGEgaWQ9ImEiPjxiIGlkPSJiIj5oZXkhPC9iPjwvYT4=');
  });
});
