import { isIPv4 } from '../../src';

describe('isIPv4', () => {
  it('incorrect', () => {
    expect(isIPv4(true)).toBe(false);
    expect(isIPv4(123)).toBe(false);
    expect(isIPv4('0.0.0')).toBe(false);
    expect(isIPv4('256.256.256.256')).toBe(false);
  });

  it('correct', () => {
    expect(isIPv4('192.168.1.1')).toBe(true);
    expect(isIPv4('255.255.255.255')).toBe(true);
  });
});
