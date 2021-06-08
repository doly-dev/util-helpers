import {
  expect
} from 'chai';

import isUrl from '../../src/isUrl'

describe('isUrl', () => {
  it('非字符串', () => {
    expect(isUrl([])).to.be.equal(false);
    expect(isUrl({})).to.be.equal(false);
    expect(isUrl(false)).to.be.equal(false);
    expect(isUrl(true)).to.be.equal(false);
    expect(isUrl(NaN)).to.be.equal(false);
    expect(isUrl(null)).to.be.equal(false);
    expect(isUrl(undefined)).to.be.equal(false);
    expect(isUrl(123)).to.be.equal(false);
    expect(isUrl()).to.be.equal(false);
    expect(isUrl('')).to.be.equal(false);
  });
  it('无效url => false', () => {
    expect(isUrl('foo')).to.be.equal(false);
    expect(isUrl('bar')).to.be.equal(false);
    expect(isUrl('/bar/test')).to.be.equal(false);
    expect(isUrl('http:/example.com')).to.be.equal(false);
    expect(isUrl('ttp://example.com')).to.be.equal(false);
    expect(isUrl('8.8.8.8')).to.be.equal(false);
    expect(isUrl('ftp://192.17.11.22:22/测试.tar')).to.be.equal(false);
    expect(isUrl('http://www.百度.中国/')).to.be.equal(false);
    expect(isUrl('http://www.baidu.com/?a=1&b=网络')).to.be.equal(false);
  });

  it('正常url => true', () => {
    expect(isUrl('http://example.com')).to.be.equal(true);
    expect(isUrl('http://example.com/')).to.be.equal(true);
    expect(isUrl('https://example.com/')).to.be.equal(true);
    expect(isUrl('http://example.com/test/123')).to.be.equal(true);
    expect(isUrl('https://example.com/test/123')).to.be.equal(true);
    expect(isUrl('http://example.com/test/123?foo=bar')).to.be.equal(true);
    expect(isUrl('https://example.com/test/123?foo=bar')).to.be.equal(true);
    expect(isUrl('http://www.example.com')).to.be.equal(true);
    expect(isUrl('http://www.example.com/')).to.be.equal(true);
    expect(isUrl('https://www.example.com/')).to.be.equal(true);
    expect(isUrl('http://www.example.com/test/123')).to.be.equal(true);
    expect(isUrl('https://www.example.com/test/123')).to.be.equal(true);
    expect(isUrl('http://www.example.com/test/123?foo=bar')).to.be.equal(true);
    expect(isUrl('https://www.example.com/test/123?foo=bar')).to.be.equal(true);
    expect(isUrl('https://example.com:8080')).to.be.equal(true);
    expect(isUrl('https://example.com:8080/')).to.be.equal(true);
  });
});