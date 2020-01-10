import {
  expect
} from 'chai';

import isIPv6 from '../../src/isIPv6'

describe('isIPv6', () => {
  it('非字符串 => false', () => {
    expect(isIPv6(true)).to.be.equal(false);
    expect(isIPv6(123)).to.be.equal(false);
  });
  it('"2001:0DB8:0000:0023:0008:0800:200C:417A" => true', () => {
    expect(isIPv6('2001:0DB8:0000:0023:0008:0800:200C:417A')).to.be.equal(true);
  });
  it('"2001:DB8:0:23:8:800:200C:417A" => true', () => {
    expect(isIPv6('2001:DB8:0:23:8:800:200C:417A')).to.be.equal(true);
  });
  it('"FF01:0:0:0:0:0:0:1101" => true', () => {
    expect(isIPv6('FF01:0:0:0:0:0:0:1101')).to.be.equal(true);
  });
  it('"FF01::1101" => true', () => {
    expect(isIPv6('FF01::1101')).to.be.equal(true);
  });
  it('"0:0:0:0:0:0:0:1" => true', () => {
    expect(isIPv6('0:0:0:0:0:0:0:1')).to.be.equal(true);
  });
  it('"::1" => true', () => {
    expect(isIPv6('::1')).to.be.equal(true);
  });
  it('"0:0:0:0:0:0:0:0" => true', () => {
    expect(isIPv6('0:0:0:0:0:0:0:0')).to.be.equal(true);
  });
  it('"::" => true', () => {
    expect(isIPv6('::')).to.be.equal(true);
  });
  it('"::192.168.1.1" => true', () => {
    expect(isIPv6('::192.168.1.1')).to.be.equal(true);
  });
  it('"::FFFF:192.168.1.1" => true', () => {
    expect(isIPv6('::FFFF:192.168.1.1')).to.be.equal(true);
  });
  it('"192.168.1.1" => false', () => {
    expect(isIPv6('192.168.1.1')).to.be.equal(false);
  });
})