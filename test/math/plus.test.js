import { plus } from '../../src';

describe('plus', () => {
  it('should be defined', () => {
    expect(plus).toBeDefined();
  });

  it('非数字', () => {
    expect(plus()).toBe();
    expect(plus(0.1)).toBe(0.1);
    expect(plus(0.1, null)).toBe(0.1);
    expect(plus(0.1, [])).toBe(0.1);
    expect(plus(0.1, undefined)).toBe(0.1);

    // 特殊处理，第二个参数非数字或字符串，将直接返回第一个参数
    expect(plus('1', true)).toBe('1');
    expect(plus(null, true)).toBe(null);
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
  });
});
