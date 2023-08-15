import { lcm } from '../src';

describe('lcm', () => {
  it('异常参数输入', () => {
    // 0个参数时，第一个参数转换为 Number(undefined) NaN ，NaN/1 = NaN
    expect(lcm()).toBe(NaN);

    // 1个参数时，另一个参数默认为 1
    expect(lcm(0)).toBe(0);
    expect(lcm(0.1)).toBe(0);
    expect(lcm(1)).toBe(1);
    expect(lcm(100)).toBe(100);
    expect(lcm(-1)).toBe(1);
    expect(lcm('')).toBe(0);
    expect(lcm(' ')).toBe(0);
    // @ts-ignore
    expect(lcm(true)).toBe(1);
    expect(lcm(Infinity)).toBe(Infinity);
    expect(lcm(-Infinity)).toBe(Infinity);
    // @ts-ignore
    expect(lcm(false)).toBe(0);
    // @ts-ignore
    expect(lcm([])).toBe(0);
    // @ts-ignore
    expect(lcm(null)).toBe(0);
    // @ts-ignore
    expect(lcm(undefined)).toBe(NaN);
    // @ts-ignore
    expect(lcm({})).toBe(NaN);
    // @ts-ignore
    expect(lcm(Symbol())).toBe(NaN);
    expect(lcm(' a')).toBe(NaN);

    // @ts-ignore
    expect(lcm(0.1, null)).toBe(NaN);
    // @ts-ignore
    expect(lcm(0.1, [])).toBe(NaN);
    // @ts-ignore
    expect(lcm(0.1, undefined)).toBe(NaN);
    // @ts-ignore
    expect(lcm(Infinity, [])).toBe(0);
    expect(lcm(Infinity, 10000)).toBe(Infinity);
    expect(lcm(10000, -Infinity)).toBe(Infinity);
    expect(lcm(10000, Infinity)).toBe(Infinity);
    expect(lcm(Infinity, Infinity)).toBe(NaN);
    expect(lcm(Infinity, 0)).toBe(0);
    // @ts-ignore
    expect(lcm('1', true)).toBe(1);
    // @ts-ignore
    expect(lcm(true, '1')).toBe(1);
    // @ts-ignore
    expect(lcm(null, true)).toBe(0);
    // @ts-ignore
    expect(lcm(true, null)).toBe(0);
    // @ts-ignore
    expect(lcm(true, '1', null)).toBe(0);
    // @ts-ignore
    expect(lcm(true, null, '1')).toBe(0);
    // @ts-ignore
    expect(lcm('0.1', '', ' ', null, '1')).toBe(0);
    // @ts-ignore
    expect(lcm(' 0.1', '', ' ', null, '1')).toBe(0);
    // @ts-ignore
    expect(lcm('0.1', ' ', true)).toBe(0);
    // @ts-ignore
    expect(lcm(true, 0.1)).toBe(0);
    // @ts-ignore
    expect(lcm(0.1, true, '0.2', null)).toBe(0);
    // @ts-ignore
    expect(lcm(0.1, null, 2)).toBe(0);
    // @ts-ignore
    expect(lcm(0.1, true, 2)).toBe(0);
    // @ts-ignore
    expect(lcm(0.1, false)).toBe(NaN);
    expect(lcm(0.1, '')).toBe(NaN);
    expect(lcm(0.1, ' ')).toBe(NaN);
    expect(lcm(0.1, 'abc')).toBe(NaN);
    expect(lcm(0.1, '123abc')).toBe(NaN);
  });

  it('数字', () => {
    expect(lcm(12, 16)).toBe(48);
    expect(lcm(6, 15)).toBe(30);
    expect(lcm(57, 48)).toBe(912);
    expect(lcm(140, 21)).toBe(420);
    expect(lcm(319, 377)).toBe(4147);
    expect(lcm(98, 63)).toBe(882);
    expect(lcm(260, 104)).toBe(520);
    expect(lcm(8, 9)).toBe(72);
    expect(lcm(8, 14)).toBe(56);
    expect(lcm(8, 16)).toBe(16);

    expect(lcm(2, 4, 8)).toBe(32);
    expect(lcm(12, 15, 18)).toBe(1080);
    expect(lcm(140, 21, 42)).toBe(17640);
    expect(lcm(140, 21, 77)).toBe(32340);
    expect(lcm(2.3, 3.8, 8, -10)).toBe(320);

    expect(lcm(8)).toBe(8);
    expect(lcm(Number.MAX_SAFE_INTEGER)).toBe(Number.MAX_SAFE_INTEGER);
    expect(lcm(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)).toBe(Number.MAX_SAFE_INTEGER);
    expect(lcm(Number.MAX_VALUE, Number.MAX_VALUE)).toBe(Infinity);
    expect(lcm(Number.MAX_VALUE, Number.MAX_SAFE_INTEGER)).toBe(Infinity);
  });
});
