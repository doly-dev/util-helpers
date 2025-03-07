import { isBankCard } from '../src';

describe('isBankCard', () => {
  it('错误数据', () => {
    // @ts-ignore
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

  it('luhn 校验', () => {
    expect(isBankCard('6228480402564890018', { luhn: true })).toBe(true);
    expect(isBankCard('6200581470885491854', { luhn: true })).toBe(true);
    expect(isBankCard('621205632767301910', { luhn: true })).toBe(true);
    expect(isBankCard('1034503324951584964', { luhn: true })).toBe(true);
    expect(isBankCard('6228480402564890', { luhn: true })).toBe(false);
  });

  it('sumCheckCode', () => {
    expect(isBankCard.sumCheckCode('622848040256489001')).toBe(8);
    expect(isBankCard.sumCheckCode('620058147088549185')).toBe(4);
    expect(isBankCard.sumCheckCode('62120563276730191')).toBe(0);
    expect(isBankCard.sumCheckCode('103450332495158496')).toBe(4);
    expect(isBankCard.sumCheckCode('622848040256489')).toBe(9);
  });
});
