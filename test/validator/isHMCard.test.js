import isHMCard from '../../src/isHMCard'

describe('isHMCard', () => {
  it('should be defined', () => {
    expect(isHMCard).toBeDefined();
  });

  it('错误数据', () => {
    expect(isHMCard()).toBe(false);
    expect(isHMCard(' ')).toBe(false);
    expect(isHMCard(true)).toBe(false);
    expect(isHMCard(123)).toBe(false);
    expect(isHMCard('h130701199310')).toBe(false);
    expect(isHMCard('H13070119931030228X')).toBe(false);
    expect(isHMCard('M230701199310302289')).toBe(false);
    expect(isHMCard('m520302198912097948')).toBe(false);
  });
  it('第一代11位', () => {
    expect(isHMCard('h3203117707')).toBe(true);
    expect(isHMCard('H3203117707')).toBe(true);
    expect(isHMCard('m3203117707')).toBe(true);
    expect(isHMCard('M3203117707')).toBe(true);
  });
  it('第二代9位', () => {
    expect(isHMCard('h32031177')).toBe(true);
    expect(isHMCard('H32031177')).toBe(true);
    expect(isHMCard('m32031177')).toBe(true);
    expect(isHMCard('M32031177')).toBe(true);
  });
})