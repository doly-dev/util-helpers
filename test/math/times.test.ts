import { times } from '../../src';

describe('times', () => {
  it('should be defined', () => {
    expect(times).toBeDefined();
  });

  it('incorrect', () => {
    // 0个参数时，被乘数转换为 Number(undefined) NaN ，NaN*1 = NaN
    expect(times()).toBe(NaN);

    // 1个参数时，乘数默认为 1
    expect(times(0)).toBe(0);
    expect(times(0.1)).toBe(0.1);
    expect(times(1)).toBe(1);
    expect(times(-1)).toBe(-1);
    expect(times('')).toBe(0);
    expect(times(' ')).toBe(0);
    // @ts-ignore
    expect(times(true)).toBe(1);
    expect(times(Infinity)).toBe(Infinity);
    expect(times(-Infinity)).toBe(-Infinity);
    // @ts-ignore
    expect(times(false)).toBe(0);
    // @ts-ignore
    expect(times([])).toBe(0);
    // @ts-ignore
    expect(times(null)).toBe(0);
    // @ts-ignore
    expect(times(undefined)).toBe(NaN);
    // @ts-ignore
    expect(times({})).toBe(NaN);
    // @ts-ignore
    expect(times(Symbol())).toBe(NaN);
    expect(times(' a')).toBe(NaN);

    // @ts-ignore
    expect(times(0.1, null)).toBe(0);
    // @ts-ignore
    expect(times(0.1, [])).toBe(0);
    // @ts-ignore
    expect(times(0.1, undefined)).toBe(0.1);
    // @ts-ignore
    expect(times(Infinity, [])).toBe(NaN); // 特殊 Infinity * 0 = NaN
    expect(times(Infinity, 10000)).toBe(Infinity);
    expect(times(10000, -Infinity)).toBe(-Infinity);
    expect(times(10000, Infinity)).toBe(Infinity);
    // @ts-ignore
    expect(times('1', true)).toBe(1);
    // @ts-ignore
    expect(times(true, '1')).toBe(1);
    // @ts-ignore
    expect(times(null, true)).toBe(0);
    // @ts-ignore
    expect(times(true, null)).toBe(0);
    // @ts-ignore
    expect(times(true, '1', null)).toBe(0);
    // @ts-ignore
    expect(times(true, null, '1')).toBe(0);
    // @ts-ignore
    expect(times('0.1', '', ' ', null, '1')).toBe(0);
    // @ts-ignore
    expect(times(' 0.1', '', ' ', null, '1')).toBe(0);
    // @ts-ignore
    expect(times('0.1', ' ', true)).toBe(0);
    // @ts-ignore
    expect(times(true, 0.1)).toBe(0.1);
    // @ts-ignore
    expect(times(0.1, true, '0.2', null)).toBe(0);
    // @ts-ignore
    expect(times(0.1, null, 2)).toBe(0);
    // @ts-ignore
    expect(times(0.1, true, 2)).toBe(0.2);
    // @ts-ignore
    expect(times(0.1, false)).toBe(0);
    expect(times(0.1, '')).toBe(0);
    expect(times(0.1, ' ')).toBe(0);
    expect(times(0.1, 'abc')).toBe(NaN);
    expect(times(0.1, '123abc')).toBe(NaN);

    // 无限循环小数问题暂时没处理，本身输入的值就是个无理数
    // expect(times(divide(7, 3), 3)).toBe(7); // 7.000000000000001
    // expect(times(times(divide(1, 3), 10), 3)).toBe(10); // 9.999999999999998

    // 其他异常输入输出
    // expect(times(-3, 2.3333333333333335)).toBe(-7); // 6.999999999999999
    // expect(times(-0.076, -92.10526315789471)).toBe(7); // 6.999999999999999
  });

  it(`correct`, () => {
    expect(times(3, 0.6)).toBe(1.8);
    expect(times('1', '1')).toBe(1);
    expect(times(3, 0.6, 2)).toBe(3.6);
    expect(times(3, 0.6, 2, 10)).toBe(36);
    expect(times(0.07, 100)).toBe(7);
    expect(times(0.7, 0.1)).toBe(0.07);
    expect(times(3, 0.3)).toBe(0.9);
    expect(times(118762317358.75, 1e-8)).toBe(1187.6231735875);
    expect(times(0.362, 100)).toBe(36.2);
    expect(times(1.1, 1.1)).toBe(1.21);
    expect(times(2.018, 1000)).toBe(2018);
    expect(times(5.2, -3.8461538461538462)).toBe(-20);
    expect(times(1.22, -1.639344262295082)).toBe(-2);
    expect(times(2.5, -0.92)).toBe(-2.3);
    expect(times(-2.2, 0.6363636363636364)).toBe(-1.4);
    expect(times(8.0, -0.3625)).toBe(-2.9);
    expect(times(6.6, 0.30303030303030304)).toBe(2);
    expect(times(10.0, -0.8)).toBe(-8);
    expect(times(-1.1, -7.272727272727273)).toBe(8);
    expect(times(-1.23e4, 20)).toBe(-246000);
    expect(times(1.7e-30, 1.5e20)).toBe(2.55e-10);
    expect(times(2, 2, 3)).toBe(12);
    expect(times(2, 2, 3, 0.1)).toBe(1.2);
    expect(times(0.000000123456, 0.000000123456)).toBe(1.5241383936e-14);
    expect(times(1.23456e-7, 1.23456e-7)).toBe(1.5241383936e-14);
  });
});
