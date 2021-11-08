import { isIPv6 } from '../../src';

describe('isIPv6', () => {
  it('should be defined', () => {
    expect(isIPv6).toBeDefined();
  });

  it('非字符串', () => {
    expect(isIPv6(true)).toBe(false);
    expect(isIPv6(123)).toBe(false);
  });
  it('"2001:0DB8:0000:0023:0008:0800:200C:417A" => true', () => {
    expect(isIPv6('2001:0DB8:0000:0023:0008:0800:200C:417A')).toBe(true);
  });
  it('"2001:DB8:0:23:8:800:200C:417A" => true', () => {
    expect(isIPv6('2001:DB8:0:23:8:800:200C:417A')).toBe(true);
  });
  it('"FF01:0:0:0:0:0:0:1101" => true', () => {
    expect(isIPv6('FF01:0:0:0:0:0:0:1101')).toBe(true);
  });
  it('"FF01::1101" => true', () => {
    expect(isIPv6('FF01::1101')).toBe(true);
  });
  it('"0:0:0:0:0:0:0:1" => true', () => {
    expect(isIPv6('0:0:0:0:0:0:0:1')).toBe(true);
  });
  it('"::1" => true', () => {
    expect(isIPv6('::1')).toBe(true);
  });
  it('"0:0:0:0:0:0:0:0" => true', () => {
    expect(isIPv6('0:0:0:0:0:0:0:0')).toBe(true);
  });
  it('"::" => true', () => {
    expect(isIPv6('::')).toBe(true);
  });
  it('"::192.168.1.1" => true', () => {
    expect(isIPv6('::192.168.1.1')).toBe(true);
  });
  it('"::FFFF:192.168.1.1" => true', () => {
    expect(isIPv6('::FFFF:192.168.1.1')).toBe(true);
  });
  it('"192.168.1.1" => false', () => {
    expect(isIPv6('192.168.1.1')).toBe(false);
  });
});
