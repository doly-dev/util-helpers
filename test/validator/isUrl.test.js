import { isUrl } from '../../src';

describe('isUrl', () => {
  it('should be defined', () => {
    expect(isUrl).toBeDefined();
  });

  it('非字符串', () => {
    expect(isUrl([])).toBe(false);
    expect(isUrl({})).toBe(false);
    expect(isUrl(false)).toBe(false);
    expect(isUrl(true)).toBe(false);
    expect(isUrl(NaN)).toBe(false);
    expect(isUrl(null)).toBe(false);
    expect(isUrl(undefined)).toBe(false);
    expect(isUrl(123)).toBe(false);
    expect(isUrl()).toBe(false);
    expect(isUrl('')).toBe(false);
  });
  it('无效url', () => {
    expect(isUrl('foo')).toBe(false);
    expect(isUrl('bar')).toBe(false);
    expect(isUrl('/bar/test')).toBe(false);
    expect(isUrl('http:/example.com')).toBe(false);
    expect(isUrl('ttp://example.com')).toBe(false);
    expect(isUrl('8.8.8.8')).toBe(false);
    expect(isUrl('ftp://192.17.11.22:22/测试.tar')).toBe(false);
    expect(isUrl('http://www.百度.中国/')).toBe(false);
    expect(isUrl('http://www.baidu.com/?a=1&b=网络')).toBe(false);
  });

  it('正常url', () => {
    expect(isUrl('http://example.com')).toBe(true);
    expect(isUrl('http://example.com/')).toBe(true);
    expect(isUrl('https://example.com/')).toBe(true);
    expect(isUrl('http://example.com/test/123')).toBe(true);
    expect(isUrl('https://example.com/test/123')).toBe(true);
    expect(isUrl('http://example.com/test/123?foo=bar')).toBe(true);
    expect(isUrl('https://example.com/test/123?foo=bar')).toBe(true);
    expect(isUrl('http://www.example.com')).toBe(true);
    expect(isUrl('http://www.example.com/')).toBe(true);
    expect(isUrl('https://www.example.com/')).toBe(true);
    expect(isUrl('http://www.example.com/test/123')).toBe(true);
    expect(isUrl('https://www.example.com/test/123')).toBe(true);
    expect(isUrl('http://www.example.com/test/123?foo=bar')).toBe(true);
    expect(isUrl('https://www.example.com/test/123?foo=bar')).toBe(true);
    expect(isUrl('https://example.com:8080')).toBe(true);
    expect(isUrl('https://example.com:8080/')).toBe(true);
    expect(isUrl('https://example.com/live?id=Ww-bYUVcVZQ**97&uid=abc')).toBe(true);
    expect(isUrl('https://example.com/live?*id*V*=Ww-bYUVcVZQ**97&uid=abc')).toBe(true);
  });
});
