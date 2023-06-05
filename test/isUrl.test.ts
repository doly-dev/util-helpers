import { isUrl } from '../src';

describe('isUrl', () => {
  it('非字符串', () => {
    expect(isUrl([])).toBe(false);
    expect(isUrl({})).toBe(false);
    expect(isUrl(false)).toBe(false);
    expect(isUrl(true)).toBe(false);
    expect(isUrl(NaN)).toBe(false);
    expect(isUrl(null)).toBe(false);
    expect(isUrl(undefined)).toBe(false);
    expect(isUrl(123)).toBe(false);
    // @ts-ignore
    expect(isUrl()).toBe(false);
    expect(isUrl('')).toBe(false);
  });

  it('无效url', () => {
    expect(isUrl('foo')).toBe(false);
    expect(isUrl('bar')).toBe(false);
    expect(isUrl('/bar/test')).toBe(false);
    expect(isUrl('http:/example.com')).toBe(false);
    expect(isUrl('//example.com')).toBe(false);
    expect(isUrl('://example.com')).toBe(false);
    expect(isUrl('wwww123')).toBe(false);
  });

  it('不同协议', () => {
    expect(isUrl('0.1')).toBe(true);
    expect(isUrl('0.1:8080')).toBe(true);
    expect(isUrl('http://0.1')).toBe(true);
    expect(isUrl('http://0.1:8080')).toBe(true);
    expect(isUrl('http://0.1:8080/')).toBe(true);
    expect(isUrl('a._')).toBe(true);
    expect(isUrl('a.*')).toBe(true);
    expect(isUrl('a..')).toBe(true);
    expect(isUrl('a._')).toBe(true);
    expect(isUrl('*.a')).toBe(true);
    expect(isUrl('..a')).toBe(true);
    expect(isUrl('b.a')).toBe(true);
    expect(isUrl('example.com')).toBe(true);
    expect(isUrl('a.example.com')).toBe(true);
    expect(isUrl('a.b.example.com')).toBe(true);
    expect(isUrl('a.b.c.example.com')).toBe(true);
    expect(isUrl('中文域名.中国')).toBe(true);
    expect(isUrl('c.中国')).toBe(true);
    expect(isUrl('中文域名.cn')).toBe(true);
    expect(isUrl('h://中文域名.cn')).toBe(true);
    expect(isUrl('http://中文域名.cn')).toBe(true);
    expect(isUrl('https://中文域名.cn')).toBe(true);
    expect(isUrl('ftp://中文域名.cn')).toBe(true);
    expect(isUrl('file://中文域名.cn/')).toBe(true);
    expect(isUrl('file://中文域名.cn/')).toBe(true);
  });

  it('ip', () => {
    expect(isUrl('8.8.8.8')).toBe(true);
    expect(isUrl('8.8.8.8:8080')).toBe(true);
    expect(isUrl('8.8.8.8/')).toBe(true);
    expect(isUrl('8.8.8.8:8080/')).toBe(true);
    expect(isUrl('https://8.8.8.8')).toBe(true);
    expect(isUrl('https://8.8.8.8/a')).toBe(true);
    expect(isUrl('ftp://127.0.0.1:8080/测试.tar')).toBe(true);
  });

  it('端口', () => {
    expect(isUrl('https://example.com:8080')).toBe(true);
    expect(isUrl('https://example.com:8080/a')).toBe(true);
    expect(isUrl('https://example.com:8080/a#id')).toBe(true);
    expect(isUrl('https://example.com:8080/a?b=中文')).toBe(true);
    expect(isUrl('https://example.com:8080/a?b=中文#id')).toBe(true);
    expect(isUrl('https://example.com:8080/a#id?b=中文')).toBe(true);
    expect(isUrl('https://example.com:8080/a?b=13#id')).toBe(true);
  });

  it('带查询和hash', () => {
    expect(isUrl('http://www.baidu.com/?a=1&b=网络')).toBe(true);
    expect(isUrl('http://www.meituan.com:8080/meituan.html?value=wang&shu*wei')).toBe(true);
    expect(isUrl('https://itunes.apple.com/WebObjects/MZStore.woa/wa/search?mt=8&submit=edit&term=微信#software')).toBe(true);
    expect(isUrl('http://example.com/test/123?foo=bar#?')).toBe(true);
    expect(isUrl('http://www.example.com/test/123?foo=bar')).toBe(true);
    expect(isUrl('https://example.com/live?id=Ww-bYUVcVZQ**97&uid=abc')).toBe(true);
    expect(isUrl('https://example.com/live?*id*V*=Ww-bYUVcVZQ**97&uid=abc')).toBe(true);
    expect(isUrl('https://www.example.com/test/123?foo=中文#id')).toBe(true);
    expect(isUrl('https://www.example.com/test/123?foo=中文#测试')).toBe(true);
  });
});
