import isBusinessLicense from '../../src/isBusinessLicense'

describe('isBusinessLicense', () => {
  it('非字符串', () => {
    expect(isBusinessLicense(true)).toBe(false);
    expect(isBusinessLicense(123)).toBe(false);
  });
  it('"310115600985533" => true', () => {
    expect(isBusinessLicense(310115600985533)).toBe(true);
  });
  it('"310115600985" => false', () => {
    expect(isBusinessLicense('310115600985')).toBe(false);
  });
  it('宽松模式，"310115600985" => false', () => {
    expect(isBusinessLicense('310115600985', { loose: true })).toBe(false);
  });
  it('"310115600985535" => false', () => {
    expect(isBusinessLicense('310115600985535')).toBe(false);
  });
  it('宽松模式，"310115600985535" => true', () => {
    expect(isBusinessLicense('310115600985535', { loose: true })).toBe(true);
  });
})