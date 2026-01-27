import { isHMCard } from '../src';

describe('isHMCard', () => {
  it('错误数据', () => {
    // @ts-ignore
    expect(isHMCard()).toBe(false);
    expect(isHMCard(' ')).toBe(false);
    expect(isHMCard(true)).toBe(false);
    expect(isHMCard(123)).toBe(false);
    expect(isHMCard('h130701199310')).toBe(false);
    expect(isHMCard('H13070119931030228X')).toBe(false);
    expect(isHMCard('M230701199310302289')).toBe(false);
    expect(isHMCard('m520302198912097948')).toBe(false);
  });
  it('正确数据', () => {
    expect(isHMCard('h32031177')).toBe(true);
    expect(isHMCard('H32031177')).toBe(true);
    expect(isHMCard('m32031177')).toBe(true);
    expect(isHMCard('M32031177')).toBe(true);
  });
});
