import { isMobile } from '../../src';

describe('isMobile', () => {
  it('should be defined', () => {
    expect(isMobile).toBeDefined();
  });

  it('incorrect', () => {
    expect(isMobile(true)).toBe(false);
    expect(isMobile(123)).toBe(false);
    expect(isMobile('13000')).toBe(false);
    expect(isMobile('10000000000')).toBe(false);
    expect(isMobile('11000000000')).toBe(false);
    expect(isMobile('12000000000')).toBe(false);
  });
  it('correct', () => {
    expect(isMobile('13000000000')).toBe(true);
    expect(isMobile('13333333333')).toBe(true);
    expect(isMobile('15000000000')).toBe(true);
    expect(isMobile('16000000000')).toBe(true);
    expect(isMobile('17000000000')).toBe(true);
    expect(isMobile('18000000000')).toBe(true);
    expect(isMobile('19000000000')).toBe(true);
  });
});
