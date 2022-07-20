import { divide } from '../../src';

describe('divide', () => {
  it('should be defined', () => {
    expect(divide).toBeDefined();
  });

  it('非数字', () => {
    expect(divide()).toBeUndefined();
    expect(divide(0.1, null)).toBe(0.1);
    expect(divide(0.1, [])).toBe(0.1);
    expect(divide(0.1)).toBe(0.1);
    expect(divide(0.1, undefined)).toBe(0.1);

    // 特殊处理，第二个参数非数字或字符串，将直接返回第一个参数
    expect(divide('1', true)).toBe('1');
    expect(divide(null, true)).toBe(null);
  });

  it('科学计数', () => {
    expect(divide(2.55e-10, 1.7e-30)).toBe(1.5e20);
    expect(divide(-1.23e4, 20)).toBe(-615);
  });

  it('数字', () => {
    expect(divide('1', '1')).toBe(1);
    expect(divide(1.21, 1.1)).toBe(1.1);
    expect(divide(4750.49269435, 4)).toBe(1187.6231735875);
    expect(divide(0.9, 3)).toBe(0.3);
    expect(divide(36.2, 0.362)).toBe(100);
    expect(divide(-20, 5.2)).toBe(-3.8461538461538462);
    expect(divide(-2, 1.22)).toBe(-1.639344262295082);
    expect(divide(-2.3, 2.5)).toBe(-0.92);
    expect(divide(-1.4, -2.2)).toBe(0.6363636363636364);
    expect(divide(7, -3)).toBe(-2.3333333333333335);
    expect(divide(7, -0.076)).toBe(-92.10526315789471);
    expect(divide(-2.9, 8.0)).toBe(-0.3625);
    expect(divide(2, 6.6)).toBe(0.30303030303030304);
    expect(divide(-8, 10.0)).toBe(-0.8);
    expect(divide(8, -1.1)).toBe(-7.272727272727273);
    expect(divide(12, 3, 2)).toBe(2);
    expect(divide(33.3333, 100)).toBe(0.333333);
    expect(divide(83.42894732749, 100)).toBe(0.8342894732749);
    expect(divide(1, 3)).toBe(0.3333333333333333);
  });
});
