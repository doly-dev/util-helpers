import isNumber from '../../src/utils/type/isNumber'

describe('isNumber', () => {
  it('1 => true', () => {
    expect(isNumber(1)).toBe(true);
  });
  it('Number.MIN_VALUE => true', () => {
    expect(isNumber(Number.MIN_VALUE)).toBe(true);
  });
  it('Infinity => true', () => {
    expect(isNumber(Infinity)).toBe(true);
  });
  it('NaN => true', () => {
    expect(isNumber(NaN)).toBe(true);
  });
  it('"1" => false', () => {
    expect(isNumber("1")).toBe(false);
  });
})