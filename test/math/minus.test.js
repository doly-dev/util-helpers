import { minus } from '../../src';

describe('minus', () => {
  it('should be defined', () => {
    expect(minus).toBeDefined();
  });

  it('异常参数输入', () => {
    // 0个参数时，被减数转换为 Number(undefined) NaN ，NaN-0 = NaN
    expect(minus()).toBe(NaN);

    // 1个参数时，减数默认为 0
    expect(minus(0)).toBe(0);
    expect(minus(0.1)).toBe(0.1);
    expect(minus(1)).toBe(1);
    expect(minus(-1)).toBe(-1);
    expect(minus('')).toBe(0);
    expect(minus(' ')).toBe(0);
    expect(minus(true)).toBe(1);
    expect(minus(Infinity)).toBe(Infinity);
    expect(minus(-Infinity)).toBe(-Infinity);
    expect(minus(false)).toBe(0);
    expect(minus([])).toBe(0);
    expect(minus(null)).toBe(0);
    expect(minus(undefined)).toBe(NaN);
    expect(minus({})).toBe(NaN);
    expect(minus(Symbol())).toBe(NaN);
    expect(minus(' a')).toBe(NaN);

    expect(minus(0.1, null)).toBe(0.1);
    expect(minus(0.1, [])).toBe(0.1);
    expect(minus(0.1, undefined)).toBe(0.1);
    expect(minus(Infinity, [])).toBe(Infinity);
    expect(minus(Infinity, 10000)).toBe(Infinity);
    expect(minus(10000, -Infinity)).toBe(Infinity);
    expect(minus(10000, Infinity)).toBe(-Infinity);
    expect(minus('1', true)).toBe(0);
    expect(minus(true, '1')).toBe(0);
    expect(minus(null, true)).toBe(-1);
    expect(minus(true, null)).toBe(1);
    expect(minus(true, '1', null)).toBe(0);
    expect(minus(true, null, '1')).toBe(0);
    expect(minus('0.1', '', ' ', null, '1')).toBe(-0.9);
    expect(minus(' 0.1', '', ' ', null, '1')).toBe(-0.9);
    expect(minus('0.1', ' ', true)).toBe(-0.9);
    expect(minus(true, 0.1)).toBe(0.9);
    expect(minus(0.1, true, '0.2', null)).toBe(-1.1);
    expect(minus(0.1, null, 2)).toBe(-1.9);
    expect(minus(0.1, true, 2)).toBe(-2.9);
    expect(minus(0.1, false)).toBe(0.1);
    expect(minus(0.1, '')).toBe(0.1);
    expect(minus(0.1, ' ')).toBe(0.1);
    expect(minus(0.1, 'abc')).toBe(NaN);
    expect(minus(0.1, '123abc')).toBe(NaN);
  });

  it(`correct`, () => {
    expect(minus('0.1', '1', '2.1')).toBe(-3);
    expect(minus('1', '1')).toBe(0);
    expect(minus(1, 0.9)).toBe(0.1);
    expect(minus(1, 0.9, 0.02)).toBe(0.08);
    expect(minus(1, 0.9, 0.02, 0.08)).toBe(0);
    expect(minus(0.07, 0.06)).toBe(0.01);
    expect(minus(0.7, 0.6)).toBe(0.1);
    expect(minus(1.0, 0.9)).toBe(0.1);
    expect(minus(1, 0)).toBe(1);
    expect(minus(1, -0)).toBe(1);
    expect(minus(-1, 0)).toBe(-1);
    expect(minus(-1, -0)).toBe(-1);
    expect(minus(1, 22)).toBe(-21);
    expect(minus(8893568.397103781249, -7.2967405955)).toBe(8893575.693844376749);
    expect(minus(105468873, 0)).toBe(105468873);
    expect(minus(1.23e5, 10)).toBe(122990);
    expect(minus(1.23e-5, 1.0023)).toBe(-1.0022877);
    expect(minus(1.3224e10, 21)).toBe(13223999979);
    expect(minus(1.3224e10, 1.3224e3)).toBe(13223998677.6);
    expect(minus(1.7e-30, 0.1e-30)).toBe(1.6e-30);
    expect(minus(6, 3, 2)).toBe(1);
    expect(minus(6, 3, 2, 1, 2, 3)).toBe(-5);
  });
});
