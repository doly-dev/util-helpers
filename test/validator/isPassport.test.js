import { isPassport } from '../../src';

describe('isPassport', () => {
  it('should be defined', () => {
    expect(isPassport).toBeDefined();
  });

  it('非字符串', () => {
    expect(isPassport(true)).toBe(false);
    expect(isPassport(123)).toBe(false);
  });
  it('"E12345678" => true', () => {
    expect(isPassport('E12345678')).toBe(true);
  });
  it('"abc" => false', () => {
    expect(isPassport('abc')).toBe(false);
  });
});
