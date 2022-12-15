import { isQQ } from '../../src';

describe('isQQ', () => {
  it('should be defined', () => {
    expect(isQQ).toBeDefined();
  });

  it('incorrect', () => {
    expect(isQQ(true)).toBe(false);
    expect(isQQ(123)).toBe(false);
    expect(isQQ('012345')).toBe(false);
    expect(isQQ('1234')).toBe(false);
  });

  it('correct', () => {
    expect(isQQ('12345')).toBe(true);
    expect(isQQ('1234567890123')).toBe(false);
  });
});
