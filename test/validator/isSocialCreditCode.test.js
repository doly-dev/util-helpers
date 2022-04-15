import { isSocialCreditCode } from '../../src';

describe('isSocialCreditCode', () => {
  it('should be defined', () => {
    expect(isSocialCreditCode).toBeDefined();
  });

  it('非字符串', () => {
    expect(isSocialCreditCode(true)).toBe(false);
    expect(isSocialCreditCode(123)).toBe(false);
  });
  it('"92310115MA1LAG5R9M" => true', () => {
    expect(isSocialCreditCode('92310115MA1LAG5R9M')).toBe(true);
  });
  it('"91350100M000100Y43" => true', () => {
    expect(isSocialCreditCode('91350100M000100Y43')).toBe(true);
  });
  it('"91350100M0001" => false', () => {
    expect(isSocialCreditCode('91350100M0001')).toBe(false);
  });
  it('"91350100M000100Y4A" => false', () => {
    expect(isSocialCreditCode('91350100M000100Y4A')).toBe(false);
  });
  it('校验位为0 "911101005JLR20JR60" => true', () => {
    expect(isSocialCreditCode('911101005JLR20JR60')).toBe(true);
  });
  it('宽松模式，"91350100M000100Y4AB" => true', () => {
    expect(isSocialCreditCode('91350100M000100Y4A', { loose: true })).toBe(true);
  });
});
