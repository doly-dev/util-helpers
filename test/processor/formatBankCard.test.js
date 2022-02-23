import { formatBankCard } from '../../src';

describe('formatBankCard', () => {
  it('should be defined', () => {
    expect(formatBankCard).toBeDefined();
  });

  it(`19位银行卡 "6228480402564890018" => 6228 4804 0256 4890 018`, () => {
    expect(formatBankCard('6228480402564890018')).toBe('6228 4804 0256 4890 018');
  });
  it(`16位银行卡 "6228480402564890" => 6228 4804 0256 4890`, () => {
    expect(formatBankCard('6228480402564890')).toBe('6228 4804 0256 4890');
  });
  it(`16位银行卡，"-"间隔 "6228480402564890" => 6228-4804-0256-4890`, () => {
    expect(formatBankCard('6228480402564890', { char: '-' })).toBe('6228-4804-0256-4890');
  });
  it(`脱敏银行卡1，"6228********890" => 6228 **** **** 890`, () => {
    expect(formatBankCard('6228********890')).toBe('6228 **** **** 890');
  });
  it(`脱敏银行卡2，"6228********890" => 6228-****-****-890`, () => {
    expect(formatBankCard('6228********890', { char: '-' })).toBe('6228-****-****-890');
  });

  it(`null => ''`, () => {
    expect(formatBankCard(null)).toBe('');
  });
  it(`undefined => ''`, () => {
    expect(formatBankCard()).toBe('');
  });
});
