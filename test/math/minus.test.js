import { minus } from '../../src';

describe('minus', () => {
  it('should be defined', () => {
    expect(minus).toBeDefined();
  });

  it('含非数字', () => {
    expect(minus()).toBe(NaN);
    expect(minus(0.1)).toBe(0.1);
    expect(minus(0.1, null)).toBe(0.1);
    expect(minus(0.1, [])).toBe(0.1);
    expect(minus(0.1, undefined)).toBe(0.1);

    // 兼容处理，如果参数包含无效数值时，尝试取出有效数值参数，否则返回NaN
    expect(minus('1', true)).toBe(1);
    expect(minus(true, '1')).toBe(1);
    expect(minus(null, true)).toBe(NaN);
    expect(minus(true, null)).toBe(NaN);
    expect(minus(true, '1', null)).toBe(1);
    expect(minus(true, null, '1')).toBe(1);
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

    // 兼容以下场景
    expect(minus(6, 3, 2, 1, 2, 3,)).toBe(-5);
    expect(minus(6, 3, 2, 1, 2, 3, null, 2)).toBe(-7);
    expect(minus(6, 3, 2, 1, 2, 3, true, 2)).toBe(-7);
    expect(minus(6, 3, 2, 1, 2, 3, false)).toBe(-5);
    expect(minus(6, 3, 2, 1, 2, 3, '')).toBe(-5);
    expect(minus(6, 3, 2, 1, 2, 3, ' ')).toBe(-5);
    expect(minus(6, 3, 2, 1, 2, 3, 'acb')).toBe(-5);
    expect(minus(6, 3, 2, 1, 2, 3, '123acb')).toBe(-5);
  });
});
