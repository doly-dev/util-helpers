import { randomString } from '../../src';

describe('randomString', () => {
  it('should be defined', () => {
    expect(randomString).toBeDefined();
  });

  it('incorrent', () => {
    expect(randomString('x')).toBe('');
    expect(randomString(undefined)).toBe('');
    expect(randomString(null)).toBe('');
  });

  it('corrent', () => {
    expect(randomString(0).length).toBe(0);
    expect(randomString(5).length).toBe(5);
    expect(randomString(10).length).toBe(10);
  });

  it('define chars', () => {
    const chars1 = 'abc';
    const rs1 = randomString(5, chars1).split('');
    rs1.map((item) => {
      expect(chars1.indexOf(item) > -1).toBeTruthy();
    });

    const chars2 = '0123456789';
    const rs2 = randomString(5, chars2).split('');
    rs2.map((item) => {
      expect(chars2.indexOf(item) > -1).toBeTruthy();
    });
  });
});
