import { isWX } from '../src';

describe('isWX', () => {
  it('incorrect', () => {
    expect(isWX(true)).toBe(false);
    expect(isWX(123)).toBe(false);
    expect(isWX('1234')).toBe(false);
  });

  it('correct', () => {
    expect(isWX('a12345')).toBe(true);
  });
});
