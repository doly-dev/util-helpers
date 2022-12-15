import { bytesToSize } from '../../src';

describe('bytesToSize', () => {
  it('should be defined', () => {
    expect(bytesToSize).toBeDefined();
  });

  it('incorrect', () => {
    // @ts-ignore
    expect(bytesToSize()).toBe('0 B');
    // @ts-ignore
    expect(bytesToSize(null)).toBe('0 B');
    // @ts-ignore
    expect(bytesToSize('')).toBe('0 B');
    // @ts-ignore
    expect(bytesToSize('abc')).toBe('0 B');
    // @ts-ignore
    expect(bytesToSize(false)).toBe('0 B');
    // @ts-ignore
    expect(bytesToSize(true)).toBe('1 B');

    // 超出单位范围
    expect(bytesToSize(Math.pow(2, 90))).toBe('1.2379400392853803e+27');
  });

  it('correct', () => {
    expect(bytesToSize(0)).toBe('0 B');
    expect(bytesToSize(1024)).toBe('1 KB');
    expect(bytesToSize(1025)).toBe('1 KB');
    expect(bytesToSize(1425)).toBe('1.39 KB');
    expect(bytesToSize(1024 * 1024)).toBe('1 MB');
    expect(bytesToSize(3.213243 * 1024 * 1024)).toBe('3.21 MB');
    expect(bytesToSize(10 * 1024 * 1024)).toBe('10 MB');
    expect(bytesToSize(1024 * 1024 * 1024)).toBe('1 GB');
    expect(bytesToSize(10 * 1024 * 1024 * 1024)).toBe('10 GB');
    expect(bytesToSize(1425000000909)).toBe('1.3 TB');
  });

  it('space mark', () => {
    expect(bytesToSize(0, { spaceMark: '' })).toBe('0B');
    expect(bytesToSize(1024, { spaceMark: '' })).toBe('1KB');
    expect(bytesToSize(1024, { spaceMark: ' - ' })).toBe('1 - KB');
    expect(bytesToSize(1025, { spaceMark: '%' })).toBe('1%KB');
  })
});
