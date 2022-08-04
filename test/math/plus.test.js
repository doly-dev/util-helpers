import { plus } from '../../src';

describe('plus', () => {
  it('should be defined', () => {
    expect(plus).toBeDefined();
  });

  it('非数字', () => {
    expect(plus()).toBe(NaN);
    expect(plus(0.1)).toBe(0.1);
    expect(plus(0.1, null)).toBe(0.1);
    expect(plus(0.1, [])).toBe(0.1);
    expect(plus(0.1, undefined)).toBe(0.1);

    // 兼容处理，如果参数包含无效数值时，尝试取出有效数值参数，否则返回NaN
    expect(plus('1', true)).toBe(1);
    expect(plus(true, '1')).toBe(1);
    expect(plus(null, true)).toBe(NaN);
    expect(plus(true, null)).toBe(NaN);
    expect(plus(true, '1', null)).toBe(1);
    expect(plus(true, null, '1')).toBe(1);
    expect(plus('0.1', '', ' ', null, '1')).toBe(1.1);
    expect(plus(' 0.1', '', ' ', null, '1')).toBe(1); // ' 0.1' 包含空格不是有效数值
  });

  it(`correct`, () => {
    expect(plus('1', '1')).toBe(2);
    expect(plus(0.1, 0.2)).toBe(0.3);
    expect(plus(2.3, 2.4)).toBe(4.7);
    expect(plus(-1.6, -1)).toBe(-2.6);
    expect(plus(-2.0, 63)).toBe(61);
    expect(plus(-3, 7)).toBe(4);
    expect(plus(-221, 38)).toBe(-183);
    expect(plus(-1, 0)).toBe(-1);
    expect(plus(2.018, 0.001)).toBe(2.019);
    expect(plus(1.3224e10, 1.3224e3)).toBe(13224001322.4);
    expect(plus(1.6e-30, 1.6e-30)).toBe(3.2e-30);
    expect(plus(0.1, 0.2, 0.3)).toBe(0.6);
    expect(plus(0.1, 0.2, 0.3, 0.4)).toBe(1);
    expect(plus(0.1, 0.2, 0.3, 0.4, 0.5)).toBe(1.5);

    // 兼容以下场景
    expect(plus(0.1)).toBe(0.1);
    expect(plus('0.1', ' ', true)).toBe(0.1);
    expect(plus(true, 0.1)).toBe(0.1);
    expect(plus('', true, 0.1, ' ', new Date(), 0.2)).toBe(0.3);
    expect(plus(0.1, true, '0.2', null)).toBe(0.3);
    expect(plus(0.1, 0.2, 0.3, 0.4, 0.5,)).toBe(1.5);
    expect(plus(0.1, 0.2, 0.3, 0.4, 0.5, null, 2)).toBe(3.5);
    expect(plus(0.1, 0.2, 0.3, 0.4, 0.5, true, 2)).toBe(3.5);
    expect(plus(0.1, 0.2, 0.3, 0.4, 0.5, false)).toBe(1.5);
    expect(plus(0.1, 0.2, 0.3, 0.4, 0.5, '')).toBe(1.5);
    expect(plus(0.1, 0.2, 0.3, 0.4, 0.5, ' ')).toBe(1.5);
    expect(plus(0.1, 0.2, 0.3, 0.4, 0.5, 'abc')).toBe(1.5);
    expect(plus(0.1, 0.2, 0.3, 0.4, 0.5, '123abc')).toBe(1.5);
  });
});
