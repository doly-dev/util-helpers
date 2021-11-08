import { isWX } from '../../src';

describe('isWX', () => {
  it('should be defined', () => {
    expect(isWX).toBeDefined();
  });

  it('非字符串', () => {
    expect(isWX(true)).toBe(false);
    expect(isWX(123)).toBe(false);
  });
  it('"a12345" => true', () => {
    expect(isWX('a12345')).toBe(true);
  });
  it('"1234" => false', () => {
    expect(isWX('1234')).toBe(false);
  });
});
