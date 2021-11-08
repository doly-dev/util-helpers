import { isBankCard } from '../../src';

describe('isBankCard', () => {
  it('should be defined', () => {
    expect(isBankCard).toBeDefined();
  });

  it('错误数据', () => {
    expect(isBankCard()).toBe(false);
    expect(isBankCard('')).toBe(false);
    expect(isBankCard(' ')).toBe(false);
    expect(isBankCard(true)).toBe(false);
    expect(isBankCard(false)).toBe(false);
    expect(isBankCard(123)).toBe(false);
    expect(isBankCard(123456)).toBe(false);
    expect(isBankCard('0123456789')).toBe(false);
    expect(isBankCard('123456789')).toBe(false);
    expect(isBankCard('1234567890123456789012345678901')).toBe(false);
  });
  it('宽松模式', () => {
    expect(isBankCard('0123456789', { loose: true })).toBe(true);
    expect(isBankCard('123456789', { loose: true })).toBe(true);
    expect(isBankCard('123456789012345678901234567890', { loose: true })).toBe(true);
  });
  it('正确数据', () => {
    expect(isBankCard('6228480402564890018')).toBe(true);
    expect(isBankCard('6228480402564890')).toBe(true);
  });
});
