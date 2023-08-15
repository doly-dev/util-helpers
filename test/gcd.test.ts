import { gcd } from '../src';

describe('gcd', () => {
  it('异常参数输入', () => {
    // 0个参数时，第一个参数转换为 Number(undefined) NaN ，NaN/1 = NaN
    expect(gcd()).toBe(NaN);

    // 1个参数时，另一个参数默认为 0
    expect(gcd(0)).toBe(0);
    expect(gcd(0.1)).toBe(0);
    expect(gcd(1)).toBe(1);
    expect(gcd(-1)).toBe(1);
    expect(gcd('')).toBe(0);
    expect(gcd(' ')).toBe(0);
    // @ts-ignore
    expect(gcd(true)).toBe(1);
    expect(gcd(Infinity)).toBe(Infinity);
    expect(gcd(-Infinity)).toBe(Infinity);
    // @ts-ignore
    expect(gcd(false)).toBe(0);
    // @ts-ignore
    expect(gcd([])).toBe(0);
    // @ts-ignore
    expect(gcd(null)).toBe(0);
    // @ts-ignore
    expect(gcd(undefined)).toBe(NaN);
    // @ts-ignore
    expect(gcd({})).toBe(NaN);
    // @ts-ignore
    expect(gcd(Symbol())).toBe(NaN);
    expect(gcd(' a')).toBe(NaN);

    // @ts-ignore
    expect(gcd(0.1, null)).toBe(0);
    // @ts-ignore
    expect(gcd(0.1, [])).toBe(0);
    // @ts-ignore
    expect(gcd(0.1, undefined)).toBe(0);
    // @ts-ignore
    expect(gcd(Infinity, [])).toBe(Infinity);
    expect(gcd(Infinity, 10000)).toBe(10000);
    expect(gcd(10000, -Infinity)).toBe(10000);
    expect(gcd(10000, Infinity)).toBe(10000);
    // @ts-ignore
    expect(gcd('1', true)).toBe(1);
    // @ts-ignore
    expect(gcd(true, '1')).toBe(1);
    // @ts-ignore
    expect(gcd(null, true)).toBe(1);
    // @ts-ignore
    expect(gcd(true, null)).toBe(1);
    // @ts-ignore
    expect(gcd(true, '1', null)).toBe(1);
    // @ts-ignore
    expect(gcd(true, null, '1')).toBe(1);
    // @ts-ignore
    expect(gcd('0.1', '', ' ', null, '1')).toBe(1);
    // @ts-ignore
    expect(gcd(' 0.1', '', ' ', null, '1')).toBe(1);
    // @ts-ignore
    expect(gcd('0.1', ' ', true)).toBe(1);
    // @ts-ignore
    expect(gcd(true, 0.1)).toBe(1);
    // @ts-ignore
    expect(gcd(0.1, true, '0.2', null)).toBe(1);
    // @ts-ignore
    expect(gcd(0.1, null, 2)).toBe(2);
    // @ts-ignore
    expect(gcd(0.1, true, 2)).toBe(1);
    // @ts-ignore
    expect(gcd(0.1, false)).toBe(0);
    expect(gcd(0.1, '')).toBe(0);
    expect(gcd(0.1, ' ')).toBe(0);
    expect(gcd(0.1, 'abc')).toBe(NaN);
    expect(gcd(0.1, '123abc')).toBe(NaN);
  });

  it('数字', () => {
    expect(gcd(12, 16)).toBe(4);
    expect(gcd(6, 15)).toBe(3);
    expect(gcd(57, 48)).toBe(3);
    expect(gcd(140, 21)).toBe(7);
    expect(gcd(319, 377)).toBe(29);
    expect(gcd(98, 63)).toBe(7);
    expect(gcd(260, 104)).toBe(52);
    expect(gcd(8, 9)).toBe(1);
    expect(gcd(8, 14)).toBe(2);

    expect(gcd(12, 15, 18)).toBe(3);
    expect(gcd(140, 21, 42)).toBe(7);
    expect(gcd(140, 21, 77)).toBe(7);
    expect(gcd(2.3, 3.8, 8, -10)).toBe(2);
  });
});
