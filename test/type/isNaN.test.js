import isNaN from '../../src/utils/type/isNaN'

describe('isNaN', () => {
  it('NaN => true', () => {
    expect(isNaN(NaN)).toBe(true);
  });
  it('1 => false', () => {
    expect(isNaN(1)).toBe(false);
  });
})