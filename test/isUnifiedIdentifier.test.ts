import { isUnifiedIdentifier } from '../src';

describe('isUnifiedIdentifier', () => {
  it('非字符串', () => {
    expect(isUnifiedIdentifier(true)).toBe(false);
    expect(isUnifiedIdentifier(123)).toBe(false);
    expect(isUnifiedIdentifier(null)).toBe(false);
    // @ts-ignore
    expect(isUnifiedIdentifier()).toBe(false);
  });
  it('incorrect', () => {
    expect(isUnifiedIdentifier('91350100M0001')).toBe(false);
    expect(isUnifiedIdentifier('91350100M000100Y4A')).toBe(false);
  });
  it('correct', () => {
    expect(isUnifiedIdentifier('92310115MA1LAG5R9M')).toBe(true);
    expect(isUnifiedIdentifier('91350100M000100Y43')).toBe(true);
    expect(isUnifiedIdentifier('911101005JLR20JR60')).toBe(true);

    // 不校验校验位
    expect(isUnifiedIdentifier('91350100M000100Y4A', { checkCode: false })).toBe(true);
    expect(isUnifiedIdentifier('91350100M000100YIO', { checkCode: false })).toBe(false);
    expect(isUnifiedIdentifier('91350100M000100Y', { checkCode: false })).toBe(false);
  });

  it('sumCheckCode', () => {
    expect(isUnifiedIdentifier.sumCheckCode('92310115MA1LAG5R9')).toBe('M');
    expect(isUnifiedIdentifier.sumCheckCode('91350100M000100Y4')).toBe('3');
    expect(isUnifiedIdentifier.sumCheckCode('911101005JLR20JR6')).toBe('0');
  });
});
