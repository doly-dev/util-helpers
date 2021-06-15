import { isIPv4 } from '../../src'

describe('isIPv4', () => {
  it('should be defined', () => {
    expect(isIPv4).toBeDefined();
  });

  it('非字符串', () => {
    expect(isIPv4(true)).toBe(false);
    expect(isIPv4(123)).toBe(false);
  });
  it('"192.168.1.1" => true', () => {
    expect(isIPv4('192.168.1.1')).toBe(true);
  });
  it('"255.255.255.255" => true', () => {
    expect(isIPv4('255.255.255.255')).toBe(true);
  });
  it('"256.256.256.256" => false', () => {
    expect(isIPv4('256.256.256.256')).toBe(false);
  });
  it('"0.0.0" => false', () => {
    expect(isIPv4('0.0.0')).toBe(false);
  });
})