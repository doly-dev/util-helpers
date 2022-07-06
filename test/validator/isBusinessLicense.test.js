import { isBusinessLicense } from '../../src';

describe('isBusinessLicense', () => {
  it('should be defined', () => {
    expect(isBusinessLicense).toBeDefined();
  });

  it('非字符串', () => {
    expect(isBusinessLicense(true)).toBe(false);
    expect(isBusinessLicense(123)).toBe(false);
    expect(isBusinessLicense(null)).toBe(false);
    expect(isBusinessLicense()).toBe(false);
  });

  it('incorrect', () => {
    expect(isBusinessLicense('310115600985')).toBe(false);
    expect(isBusinessLicense('310115600985535')).toBe(false);
  });

  it('correct', () => {
    expect(isBusinessLicense(310115600985533)).toBe(true);
    expect(isBusinessLicense('310115600985533')).toBe(true);

    // 不校验校验位
    expect(isBusinessLicense('310115600985532', { checkCode: false })).toBe(true);
    expect(isBusinessLicense('310115600985535', { checkCode: false })).toBe(true);
    expect(isBusinessLicense('3101156009855', { checkCode: false })).toBe(false);
  });
});
