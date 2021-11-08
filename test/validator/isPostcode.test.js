import { isPostcode } from '../../src';

describe('isPostcode', () => {
  it('should be defined', () => {
    expect(isPostcode).toBeDefined();
  });

  it('非字符串', () => {
    expect(isPostcode(true)).toBe(false);
    expect(isPostcode(123)).toBe(false);
  });
  it('"101111" => true', () => {
    expect(isPostcode('101111')).toBe(true);
  });
  it('"123" => false', () => {
    expect(isPostcode('123')).toBe(false);
  });
});
