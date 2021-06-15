import isTWCard from '../../src/isTWCard'

describe('isTWCard', () => {
  it('should be defined', () => {
    expect(isTWCard).toBeDefined();
  });

  it('错误数据', () => {
    expect(isTWCard()).toBe(false);
    expect(isTWCard(' ')).toBe(false);
    expect(isTWCard(true)).toBe(false);
    expect(isTWCard(123)).toBe(false);
    expect(isTWCard('h1307098')).toBe(false);
    expect(isTWCard('abcdefgh')).toBe(false);
    expect(isTWCard('123456789')).toBe(false);
    expect(isTWCard('12345678901')).toBe(false);
  });
  it('一次性短期台胞证10位，可能带有英文', () => {
    expect(isTWCard('F290299977')).toBe(true);
  });
  it('8位号码', () => {
    expect(isTWCard('12345678')).toBe(true);
    expect(isTWCard('07257456')).toBe(true);
  });
})