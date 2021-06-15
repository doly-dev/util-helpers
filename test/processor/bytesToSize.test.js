import { bytesToSize } from '../../src';

describe('bytesToSize', () => {
  it('should be defined', () => {
    expect(bytesToSize).toBeDefined();
  });

  it(`0 => "0 B"`, () => {
    expect(bytesToSize(0)).toBe('0 B');
  });
  it(`1024 => "1 KB"`, () => {
    expect(bytesToSize(1024)).toBe('1 KB');
  });
  it(`1025 => 1 KB`, () => {
    expect(bytesToSize(1025)).toBe('1 KB');
  });
  it(`1425 => 1.39 KB`, () => {
    expect(bytesToSize(1425)).toBe('1.39 KB');
  });
  it(`1024 * 1024 => 1 MB`, () => {
    expect(bytesToSize(1024 * 1024)).toBe('1 MB');
  });
  it(`3.213243*1024*1024 => 3.21 MB`, () => {
    expect(bytesToSize(3.213243 * 1024 * 1024)).toBe('3.21 MB');
  });
  it(`10 * 1024 * 1024 => 10 MB`, () => {
    expect(bytesToSize(10 * 1024 * 1024)).toBe('10 MB');
  });
  it(`1024*1024*1024 => 1 GB`, () => {
    expect(bytesToSize(1024 * 1024 * 1024)).toBe('1 GB');
  });
  it(`10 * 1024*1024*1024 => 10 GB`, () => {
    expect(bytesToSize(10 * 1024 * 1024 * 1024)).toBe('10 GB');
  });
  it(`1425000000909 => 1.3 TB`, () => {
    expect(bytesToSize(1425000000909)).toBe('1.3 TB');
  });
})