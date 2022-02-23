import isNil from '../../src/utils/type/isNil';

describe('isNil', () => {
  it('null => true', () => {
    expect(isNil(null)).toBe(true);
  });
  it('undefined => true', () => {
    expect(isNil(undefined)).toBe(true);
  });
  it(' => true', () => {
    expect(isNil()).toBe(true);
  });
  it('void 0 => true', () => {
    expect(isNil(void 0)).toBe(true);
  });

  it('false => false', () => {
    expect(isNil(false)).toBe(false);
  });
  it('true => false', () => {
    expect(isNil(true)).toBe(false);
  });
  it('NaN => false', () => {
    expect(isNil(NaN)).toBe(false);
  });
  it('1 => false', () => {
    expect(isNil(1)).toBe(false);
  });
  it('{} => false', () => {
    expect(isNil({})).toBe(false);
  });
  it('[] => false', () => {
    expect(isNil([])).toBe(false);
  });
});
