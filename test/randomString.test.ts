import { randomString } from '../src';

describe('randomString', () => {
  it('basic', () => {
    expect(randomString(0).length).toBe(0);
    expect(randomString(5).length).toBe(5);
    expect(randomString(10).length).toBe(10);
  });

  it('type chars', () => {
    const num1 = randomString(5, 'number');
    const num2 = randomString(10, 'number');
    const regNum = /^\d*$/;
    expect(regNum.test(num1)).toBe(true);
    expect(regNum.test(num2)).toBe(true);

    const low1 = randomString(5, 'lower');
    const low2 = randomString(5, 'lower');
    const regLow = /^[a-z]*$/;
    expect(regLow.test(low1)).toBe(true);
    expect(regLow.test(low2)).toBe(true);

    const up1 = randomString(5, 'upper');
    const up2 = randomString(5, 'upper');
    const regUp = /^[A-Z]*$/;
    expect(regUp.test(up1)).toBe(true);
    expect(regUp.test(up2)).toBe(true);
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

  it('incorrent', () => {
    // @ts-ignore
    expect(randomString('x')).toBe('');
    // @ts-ignore
    expect(randomString(undefined)).toBe('');
    // @ts-ignore
    expect(randomString(null)).toBe('');
  });

  it('array chars', () => {
    const rs1 = randomString(5, ['number', 'lower']);
    const reg1 = /^[0-9a-z]*$/;
    expect(reg1.test(rs1)).toBe(true);

    const rs2 = randomString(5, ['upper', 'number']);
    const reg2 = /^[A-Z0-9]*$/;
    expect(reg2.test(rs2)).toBe(true);

    const rs3 = randomString(5, ['lower', 'upper']);
    const reg3 = /^[a-zA-Z]*$/;
    expect(reg3.test(rs3)).toBe(true);

    const rs4 = randomString(5, ['number', 'lower', 'upper']);
    const reg4 = /^[0-9a-zA-Z]*$/;
    expect(reg4.test(rs4)).toBe(true);
  });
});
