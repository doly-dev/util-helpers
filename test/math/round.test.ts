import { round } from '../../src';

describe('round', () => {
  it('incorrect', () => {
    // @ts-ignore
    expect(round()).toBe(NaN);
    // @ts-ignore
    expect(round(null)).toBe(0);
    // @ts-ignore
    expect(round(true)).toBe(1);
    expect(round('')).toBe(0);
    expect(round(' ')).toBe(0);
    expect(round(NaN)).toBe(NaN);
    // @ts-ignore
    expect(round(false)).toBe(0);
    // @ts-ignore
    expect(round([])).toEqual(0);
    // @ts-ignore
    expect(round(undefined)).toEqual(NaN);
    // @ts-ignore
    expect(round({})).toEqual(NaN);
    // @ts-ignore
    expect(round(Symbol())).toEqual(NaN);
    expect(round('10.2.3')).toBe(NaN);
  });

  it(`correct`, () => {
    expect(round(4.006)).toBe(4);
    expect(round('4.006')).toBe(4);
    expect(round(4.006, 2)).toBe(4.01);
    expect(round(4060, -2)).toBe(4100);
    expect(round(0, 1)).toBe(0);
    expect(round(0, 0)).toBe(0);
    expect(round(0.7875, 3)).toBe(0.788);
    expect(round(0.105, 2)).toBe(0.11);
    expect(round(1, 1)).toBe(1);
    expect(round(0.1049999999, 2)).toBe(0.1);
    expect(round(0.105, 1)).toBe(0.1);
    expect(round(1.335, 2)).toBe(1.34);
    expect(round(1.35, 1)).toBe(1.4);
    expect(round(12345.105, 2)).toBe(12345.11);
    expect(round(0.0005, 2)).toBe(0);
    expect(round(0.0005, 3)).toBe(0.001);
    expect(round(1.2345e3, 3)).toBe(1234.5);
    expect(round(1.2344e3, 3)).toBe(1234.4);
    expect(round(1e3, 1)).toBe(1000);
  });
});
