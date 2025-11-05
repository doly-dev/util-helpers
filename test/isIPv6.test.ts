import { isIPv6 } from '../src';

describe('isIPv6', () => {
  it('incorrect', () => {
    expect(isIPv6(true)).toBe(false);
    expect(isIPv6(123)).toBe(false);
    expect(isIPv6('192.168.1.1')).toBe(false);
  });

  it('correct', () => {
    // IPv6链路本地地址(一般网段是fe80::/10)是用来保证链路之间的通信（非路由通信），一般是根据MAC地址用EUI-64算法生成。
    expect(isIPv6('2001:db8:130f:0:0:9c0:876a:1%0b')).toBe(true);
    expect(isIPv6('2001:0DB8:0000:0023:0008:0800:200C:417A')).toBe(true);
    expect(isIPv6('2001:DB8:0:23:8:800:200C:417A')).toBe(true);
    expect(isIPv6('FF01:0:0:0:0:0:0:1101')).toBe(true);
    expect(isIPv6('FF01::1101')).toBe(true);
    expect(isIPv6('0:0:0:0:0:0:0:1')).toBe(true);
    expect(isIPv6('::1')).toBe(true);
    expect(isIPv6('0:0:0:0:0:0:0:0')).toBe(true);
    expect(isIPv6('::')).toBe(true);
    expect(isIPv6('::192.168.1.1')).toBe(true);
    expect(isIPv6('::FFFF:192.168.1.1')).toBe(true);
  });
});
