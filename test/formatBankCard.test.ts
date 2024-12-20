import { formatBankCard } from '../src';

describe('formatBankCard', () => {
  it('incorrect', () => {
    // @ts-ignore
    expect(formatBankCard(null)).toBe('');
    expect(formatBankCard()).toBe('');
  });

  it(`19位银行卡`, () => {
    expect(formatBankCard('6228480402564890018')).toBe('6228 4804 0256 4890 018');
  });
  it(`16位银行卡`, () => {
    expect(formatBankCard('6228480402564890')).toBe('6228 4804 0256 4890');
    expect(formatBankCard('6228480402564890', { spaceMark: '-' })).toBe('6228-4804-0256-4890');
  });
  it(`脱敏银行卡`, () => {
    expect(formatBankCard('6228********890')).toBe('6228 **** **** 890');
    expect(formatBankCard('6228********890', { spaceMark: '-' })).toBe('6228-****-****-890');
  });
  it('length', () => {
    expect(formatBankCard('6228480402564890', { length: 6 })).toBe('622848 040256 4890');
    expect(formatBankCard('6228480402564890', { spaceMark: '-', length: 6 })).toBe('622848-040256-4890');

    expect(formatBankCard('6228********890', { length: 6 })).toBe('6228** ****** 890');
    expect(formatBankCard('6228********890', { spaceMark: '-', length: 6 })).toBe('6228**-******-890');
  });
});
