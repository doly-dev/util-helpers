import isNull from '../../src/utils/type/isNull';

describe('isNull', () => {
  it('null => true', () => {
    expect(isNull(null)).toBe(true);
  });
  it('false => false', () => {
    expect(isNull(false)).toBe(false);
  });
});
