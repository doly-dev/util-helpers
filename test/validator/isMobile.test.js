import { isMobile } from '../../src'

describe('isMobile', () => {
  it('should be defined', () => {
    expect(isMobile).toBeDefined();
  });

  it('非字符串', () => {
    expect(isMobile(true)).toBe(false);
    expect(isMobile(123)).toBe(false);
  });
  it('"13000000000" => true', () => {
    expect(isMobile('13000000000')).toBe(true);
  });
  it('"13000" => false', () => {
    expect(isMobile('13000')).toBe(false);
  });
  it('"10000000000" => false', () => {
    expect(isMobile('10000000000')).toBe(false);
  });
})