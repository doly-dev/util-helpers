import { isTWCard } from '../src';

describe('isTWCard', () => {
  it('incorrect', () => {
    // @ts-ignore
    expect(isTWCard()).toBe(false);
    expect(isTWCard(' ')).toBe(false);
    expect(isTWCard(true)).toBe(false);
    expect(isTWCard(123)).toBe(false);
    expect(isTWCard('h1307098')).toBe(false);
    expect(isTWCard('abcdefgh')).toBe(false);
    expect(isTWCard('123456789')).toBe(false);
    expect(isTWCard('12345678901')).toBe(false);
  });
  it('一次性短期台胞证', () => {
    expect(isTWCard('F290299977', { loose: true })).toBe(true);
    expect(isTWCard('F290299977')).toBe(false);
  });
  it('8位号码', () => {
    expect(isTWCard('12345678')).toBe(true);
    expect(isTWCard('07257456')).toBe(true);
  });
});
