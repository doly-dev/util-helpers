import { plus } from '../../src';

describe('plus', () => {
  it('should be defined', () => {
    expect(plus).toBeDefined();
  });
  it(`0.1 + 0.2 = 0.3`, () => {
    expect(plus(0.1, 0.2)).toBe(0.3);
  });
  it(`字符串 '1' + '1'`, () => {
    expect(plus('1', '1')).toBe(2);
  });
  it(`2.3 + 2.4 = 4.7`, () => {
    expect(plus(2.3, 2.4)).toBe(4.7);
  });
  it(`-1.6 + -1 = -2.6`, () => {
    expect(plus(-1.6, -1)).toBe(-2.6);
  });
  it(`-2.0 + 63 = 61`, () => {
    expect(plus(-2.0, 63)).toBe(61);
  });
  it(`-3 + 7 = 4`, () => {
    expect(plus(-3, 7)).toBe(4);
  });
  it(`-221 + 38 = -183`, () => {
    expect(plus(-221, 38)).toBe(-183);
  });
  it(`-1 + 0 = -1`, () => {
    expect(plus(-1, 0)).toBe(-1);
  });
  it(`2.018 + 0.001 = 2.019`, () => {
    expect(plus(2.018, 0.001)).toBe(2.019);
  });
  it(`1.3224e10 + 1.3224e3 = 13224001322.4`, () => {
    expect(plus(1.3224e10, 1.3224e3)).toBe(13224001322.4);
  });
  it(`1.6e-30 + 1.6e-30 = 3.2e-30`, () => {
    expect(plus(1.6e-30, 1.6e-30)).toBe(3.2e-30);
  });
  it(`0.1 + 0.2 + 0.3 = 0.6`, () => {
    expect(plus(0.1, 0.2, 0.3)).toBe(0.6);
  });
  it(`0.1 + 0.2 + 0.3 + 0.4 = 1`, () => {
    expect(plus(0.1, 0.2, 0.3, 0.4)).toBe(1);
  });
  it(`0.1 + 0.2 + 0.3 + 0.4 + 0.5 = 1.5`, () => {
    expect(plus(0.1, 0.2, 0.3, 0.4, 0.5)).toBe(1.5);
  });
});

describe('plus special', () => {
  it(`() = undefined`, () => {
    expect(plus()).toBe();
  });
  it(`(0.1) = 0.1`, () => {
    expect(plus(0.1)).toBe(0.1);
  });
  it(`(0.1, null) = 0.1`, () => {
    expect(plus(0.1, null)).toBe(0.1);
  });
  it(`(0.1, []) = 0.1`, () => {
    expect(plus(0.1, [])).toBe(0.1);
  });
  it(`(0.1, undefined) = 0.1`, () => {
    expect(plus(0.1, undefined)).toBe(0.1);
  });
});
