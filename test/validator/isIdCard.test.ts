import { isIdCard } from '../../src';

describe('isIdCard', () => {
  it('should be defined', () => {
    expect(isIdCard).toBeDefined();
  });

  it('错误数据', () => {
    // @ts-ignore
    expect(isIdCard()).toBe(false);
    expect(isIdCard(' ')).toBe(false);
    expect(isIdCard(true)).toBe(false);
    expect(isIdCard(123)).toBe(false);
    expect(isIdCard('130701199310')).toBe(false);
    expect(isIdCard('13070119931030228X')).toBe(false);
    expect(isIdCard('230701199310302289')).toBe(false);
    expect(isIdCard('520302198912097948')).toBe(false);
  });
  it('正常模式下15位不通过', () => {
    expect(isIdCard('320311770706001')).toBe(false);
  });
  it('宽松模式下支持15位', () => {
    expect(isIdCard('320311770706001', { loose: true })).toBe(true);
  });
  it('不校验校验码的正确数据', () => {
    expect(isIdCard('13070119931030228X', { checkCode: false })).toBe(true);
    expect(isIdCard('230701199310302288', { checkCode: false })).toBe(true);
    expect(isIdCard('23070119931030228X', { checkCode: false })).toBe(true);
    expect(isIdCard('520302198912097948', { checkCode: false })).toBe(true);
  });
  it('正确数据', () => {
    expect(isIdCard('130701199310302288')).toBe(true);
    expect(isIdCard('52030219891209794X')).toBe(true);
  });
});
