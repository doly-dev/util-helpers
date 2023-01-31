import { isPostcode } from '../../src';

describe('isPostcode', () => {
  it('incorrect', () => {
    expect(isPostcode(true)).toBe(false);
    expect(isPostcode(123)).toBe(false);
    expect(isPostcode('123')).toBe(false);
  });

  it('correct', () => {
    expect(isPostcode('101111')).toBe(true);
    expect(isPostcode('200000')).toBe(true);
    expect(isPostcode('300450')).toBe(true);
  });
});
