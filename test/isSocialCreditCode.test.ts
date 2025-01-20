import { isSocialCreditCode } from '../src';

describe('isSocialCreditCode', () => {
  it('非字符串', () => {
    expect(isSocialCreditCode(true)).toBe(false);
    expect(isSocialCreditCode(123)).toBe(false);
    expect(isSocialCreditCode(null)).toBe(false);
    // @ts-ignore
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
    expect(isSocialCreditCode('91350100M000100YIO', { checkCode: false })).toBe(false);
    expect(isSocialCreditCode('91350100M000100Y', { checkCode: false })).toBe(false);
  });

  it('sumCheckCode', () => {
    expect(isSocialCreditCode.sumCheckCode('92310115MA1LAG5R9')).toBe('M');
    expect(isSocialCreditCode.sumCheckCode('91350100M000100Y4')).toBe('3');
    expect(isSocialCreditCode.sumCheckCode('911101005JLR20JR6')).toBe('0');
  });
});
