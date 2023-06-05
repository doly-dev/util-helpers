import { plus } from '../src';

describe('plus', () => {
  it('异常参数输入', () => {
    // 0个参数时，被加数转换为 Number(undefined) NaN ，NaN+0 = NaN
    expect(plus()).toBe(NaN);

    // 1个参数时，加数默认为 0
    expect(plus(0)).toBe(0);
    expect(plus(0.1)).toBe(0.1);
    expect(plus(1)).toBe(1);
    expect(plus(-1)).toBe(-1);
    expect(plus('')).toBe(0);
    expect(plus(' ')).toBe(0);
    // @ts-ignore
    expect(plus(true)).toBe(1);
    expect(plus(Infinity)).toBe(Infinity);
    expect(plus(-Infinity)).toBe(-Infinity);
    // @ts-ignore
    expect(plus(false)).toBe(0);
    // @ts-ignore
    expect(plus([])).toBe(0);
    // @ts-ignore
    expect(plus(null)).toBe(0);
    // @ts-ignore
    expect(plus(undefined)).toBe(NaN);
    // @ts-ignore
    expect(plus({})).toBe(NaN);
    // @ts-ignore
    expect(plus(Symbol())).toBe(NaN);
    expect(plus(' a')).toBe(NaN);

    // @ts-ignore
    expect(plus(0.1, null)).toBe(0.1);
    // @ts-ignore
    expect(plus(0.1, [])).toBe(0.1);
    // @ts-ignore
    expect(plus(0.1, undefined)).toBe(0.1);
    // @ts-ignore
    expect(plus(Infinity, [])).toBe(Infinity);
    expect(plus(Infinity, 10000)).toBe(Infinity);
    expect(plus(10000, -Infinity)).toBe(-Infinity);
    expect(plus(10000, Infinity)).toBe(Infinity);
    // @ts-ignore
    expect(plus('1', true)).toBe(2);
    // @ts-ignore
    expect(plus(true, '1')).toBe(2);
    // @ts-ignore
    expect(plus(null, true)).toBe(1);
    // @ts-ignore
    expect(plus(true, null)).toBe(1);
    // @ts-ignore
    expect(plus(true, '1', null)).toBe(2);
    // @ts-ignore
    expect(plus(true, null, '1')).toBe(2);
    // @ts-ignore
    expect(plus('0.1', '', ' ', null, '1')).toBe(1.1);
    // @ts-ignore
    expect(plus(' 0.1', '', ' ', null, '1')).toBe(1.1);
    // @ts-ignore
    expect(plus('0.1', ' ', true)).toBe(1.1);
    // @ts-ignore
    expect(plus(true, 0.1)).toBe(1.1);
    // @ts-ignore
    expect(plus(0.1, true, '0.2', null)).toBe(1.3);
    // @ts-ignore
    expect(plus(0.1, null, 2)).toBe(2.1);
    // @ts-ignore
    expect(plus(0.1, true, 2)).toBe(3.1);
    // @ts-ignore
    expect(plus(0.1, false)).toBe(0.1);
    expect(plus(0.1, '')).toBe(0.1);
    expect(plus(0.1, ' ')).toBe(0.1);
    expect(plus(0.1, 'abc')).toBe(NaN);
    expect(plus(0.1, '123abc')).toBe(NaN);
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
