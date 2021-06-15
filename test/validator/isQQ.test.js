import isQQ from '../../src/isQQ'

describe('isQQ', () => {
  it('非字符串', () => {
    expect(isQQ(true)).toBe(false);
    expect(isQQ(123)).toBe(false);
  });
  it('"12345" => true', () => {
    expect(isQQ('12345')).toBe(true);
  });
  it('"012345" => false', () => {
    expect(isQQ('012345')).toBe(false);
  });
  it('"1234" => false', () => {
    expect(isQQ('1234')).toBe(false);
  });
  it('"1234567890123" => false', () => {
    expect(isQQ('1234567890123')).toBe(false);
  });
})