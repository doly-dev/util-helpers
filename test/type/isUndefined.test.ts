import isUndefined from '../../src/utils/type/isUndefined';

describe('isUndefined', () => {
  it('undefined => true', () => {
    expect(isUndefined(undefined)).toBe(true);
  });
  it('void 0 => true', () => {
    expect(isUndefined(void 0)).toBe(true);
  });
  it('null => false', () => {
    expect(isUndefined(null)).toBe(false);
  });
});
