import { isSocialCreditCode } from '../../src';

describe('isSocialCreditCode', () => {
  it('should be defined', () => {
    expect(isSocialCreditCode).toBeDefined();
  });

  it('非字符串', () => {
    expect(isSocialCreditCode(true)).toBe(false);
    expect(isSocialCreditCode(123)).toBe(false);
    expect(isSocialCreditCode(null)).toBe(false);
    expect(isSocialCreditCode()).toBe(false);
  });
  it('incorrect', () => {
    expect(isSocialCreditCode('91350100M0001')).toBe(false);
    expect(isSocialCreditCode('91350100M000100Y4A')).toBe(false);
  });
  it('correct', () => {
    expect(isSocialCreditCode('92310115MA1LAG5R9M')).toBe(true);
    expect(isSocialCreditCode('91350100M000100Y43')).toBe(true);
    expect(isSocialCreditCode('911101005JLR20JR60')).toBe(true);

    // 不校验校验位
    expect(isSocialCreditCode('91350100M000100Y4A', { checkCode: false })).toBe(true);
    expect(isSocialCreditCode('91350100M000100Y', { checkCode: false })).toBe(false);
  });
});
