import { isPassport } from '../../src';

describe('isPassport', () => {
  it('should be defined', () => {
    expect(isPassport).toBeDefined();
  });

  it('非字符串', () => {
    expect(isPassport()).toBe(false);
    expect(isPassport(null)).toBe(false);
    expect(isPassport(true)).toBe(false);
    expect(isPassport(123)).toBe(false);
  });
  it('correct', () => {
    expect(isPassport('e12345678')).toBe(true);
    expect(isPassport('E12345678')).toBe(true);
    expect(isPassport('de2345678')).toBe(true);
    expect(isPassport('DE2345678')).toBe(true);
    expect(isPassport('De2345678')).toBe(true);
    expect(isPassport('se2345678')).toBe(true);
    expect(isPassport('pe2345678')).toBe(true);
    expect(isPassport('ka2345678')).toBe(true);
    expect(isPassport('kb2345678')).toBe(true);
    expect(isPassport('kj2345678')).toBe(true);
    expect(isPassport('Km2345678')).toBe(true);
    expect(isPassport('hm2345678')).toBe(true);
    expect(isPassport('Hj2345678')).toBe(true);
    expect(isPassport('ha2345678')).toBe(true);
    expect(isPassport('Ma2345678')).toBe(true);
    expect(isPassport('ma2345678')).toBe(true);
    expect(isPassport('mB2345678')).toBe(true);
    expect(isPassport('MB2345678')).toBe(true);
    expect(isPassport('MN2345678')).toBe(true);
    expect(isPassport('Mj2345678')).toBe(true);
  });
  it('incorrect', () => {
    expect(isPassport('abc')).toBe(false);
    expect(isPassport('dc2345678')).toBe(false);
    expect(isPassport('sc2345678')).toBe(false);
    expect(isPassport('pc2345678')).toBe(false);
    expect(isPassport('dk2345678')).toBe(false);
  });
});
