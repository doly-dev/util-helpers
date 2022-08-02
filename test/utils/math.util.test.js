// import { setDisableWarning } from '../../src/utils/config';
import { strip, digitLength, float2Fixed, trimLeftZero, scientificToNumber, checkBoundary, isEffectiveNumeric } from '../../src/utils/math.util';

describe('math.util', () => {
  it('strip', () => {
    expect(strip(0.09999999999999998)).toBe(0.1);
    expect(strip(1.0000000000000001)).toBe(1);
  });

  it('digitLength', () => {
    expect(digitLength(123.4567890123)).toBe(10);
    expect(digitLength(1.23e-5)).toBe(7);
    expect(digitLength(1.233467e-5)).toBe(11);
    expect(digitLength(123.45e-5)).toBe(7);
    expect(digitLength(1.23e-10)).toBe(12);
    expect(digitLength(1.23e1)).toBe(1);
    expect(digitLength(1e20)).toBe(0);
    expect(digitLength(1.12345e20)).toBe(0);
    expect(digitLength(1.123e30)).toBe(0);
    expect(digitLength(1.123e-100)).toBe(103);
  });

  it('float2Fixed', () => {
    expect(float2Fixed(1e-1)).toBe(1);
    expect(float2Fixed(1e-6)).toBe(1);
    expect(float2Fixed(1e-6)).toBe(1);
    expect(float2Fixed(1e-13)).toBe(1);
    expect(float2Fixed(1.123e30)).toBe(1.123e30);
    expect(float2Fixed(1.6e-30)).toBe(16);
    expect(float2Fixed(1.234567e-13)).toBe(1234567);
    expect(float2Fixed(1.2345678912345e10)).toBe(12345678912345);
    expect(float2Fixed(0.000000123456)).toBe(123456);
    expect(float2Fixed(1.23456e-7)).toBe(123456);
  });

  it('trimLeftZero', () => {
    expect(trimLeftZero('010.123')).toBe('10.123');
    expect(trimLeftZero('000.123')).toBe('0.123');
    expect(trimLeftZero('0')).toBe('0');
  });

  it('scientificToNumber', () => {
    expect(scientificToNumber(2.2e-7)).toBe('0.00000022');
    expect(scientificToNumber(1.1111111111111111e21)).toBe('1111111111111111100000');
    expect(scientificToNumber('5.13232e+3')).toBe('5132.32'); // 如果传入的是数字，会自动转为数字
    expect(scientificToNumber(5.13232e3)).toBe(5132.32);

    // 负
    expect(scientificToNumber('0.1e-1')).toBe('0.01');
    expect(scientificToNumber('1e-1')).toBe('0.1');
    expect(scientificToNumber('10e-1')).toBe('1');
    expect(scientificToNumber('100e-1')).toBe('10');
    expect(scientificToNumber('1000e-1')).toBe('100');
    expect(scientificToNumber('10000e-1')).toBe('1000');
    expect(scientificToNumber('1.2e-1')).toBe('0.12');
    expect(scientificToNumber('10.2e-1')).toBe('1.02');
    expect(scientificToNumber('100.2e-1')).toBe('10.02');
    expect(scientificToNumber('1000.2e-1')).toBe('100.02');
    expect(scientificToNumber('10000.2e-1')).toBe('1000.02');
    expect(scientificToNumber('1e-2')).toBe('0.01');
    expect(scientificToNumber('1.2e-2')).toBe('0.012');
    expect(scientificToNumber('10.2e-2')).toBe('0.102');
    expect(scientificToNumber('100.2e-2')).toBe('1.002');
    expect(scientificToNumber('1000.2e-2')).toBe('10.002');
    expect(scientificToNumber('10000.2e-2')).toBe('100.002');
    expect(scientificToNumber('1e-3')).toBe('0.001');
    expect(scientificToNumber('1.2e-3')).toBe('0.0012');
    expect(scientificToNumber('10.2e-3')).toBe('0.0102');
    expect(scientificToNumber('100.2e-3')).toBe('0.1002');
    expect(scientificToNumber('1000.2e-3')).toBe('1.0002');
    expect(scientificToNumber('10000.2e-3')).toBe('10.0002');
    // 正
    expect(scientificToNumber('0.1e+1')).toBe('1');
    expect(scientificToNumber('1e+1')).toBe('10');
    expect(scientificToNumber('10e+1')).toBe('100');
    expect(scientificToNumber('100e+1')).toBe('1000');
    expect(scientificToNumber('1000e+1')).toBe('10000');
    expect(scientificToNumber('10000e+1')).toBe('100000');
    expect(scientificToNumber('1.2e+1')).toBe('12');
    expect(scientificToNumber('10.2e+1')).toBe('102');
    expect(scientificToNumber('100.2e+1')).toBe('1002');
    expect(scientificToNumber('1000.2e+1')).toBe('10002');
    expect(scientificToNumber('10000.2e+1')).toBe('100002');
    expect(scientificToNumber('1e+2')).toBe('100');
    expect(scientificToNumber('1.2e+2')).toBe('120');
    expect(scientificToNumber('10.2e+2')).toBe('1020');
    expect(scientificToNumber('100.2e+2')).toBe('10020');
    expect(scientificToNumber('1000.2e+2')).toBe('100020');
    expect(scientificToNumber('10000.2e+2')).toBe('1000020');
    expect(scientificToNumber('1e+3')).toBe('1000');
    expect(scientificToNumber('1.2e+3')).toBe('1200');
    expect(scientificToNumber('10.2e+3')).toBe('10200');
    expect(scientificToNumber('100.2e+3')).toBe('100200');
    expect(scientificToNumber('1000.2e+3')).toBe('1000200');
    expect(scientificToNumber('10000.2e+3')).toBe('10000200');
    // 非科学计数法数字
    expect(scientificToNumber(null)).toBe(null);
    expect(scientificToNumber()).toBeUndefined();
    expect(scientificToNumber(true)).toBe(true);
    expect(scientificToNumber(false)).toBe(false);
    expect(scientificToNumber([])).toEqual([]);
    expect(scientificToNumber(5.13232e3)).toBe(5132.32); // 会自动转为数字
  });

  it('checkBoundary', () => {
    // setDisableWarning(false);
    expect(checkBoundary(Number.MAX_SAFE_INTEGER + 1)).toBeUndefined();
    expect(checkBoundary(Number.MAX_SAFE_INTEGER)).toBeUndefined();
    expect(checkBoundary(Number.MIN_SAFE_INTEGER - 1)).toBeUndefined();
    expect(checkBoundary(Number.MIN_SAFE_INTEGER)).toBeUndefined();
  });

  it('isEffectiveNumeric', () => {
    // incorrect
    expect(isEffectiveNumeric('')).toBe(false);
    expect(isEffectiveNumeric(' ')).toBe(false);
    expect(isEffectiveNumeric('10.2.2')).toBe(false);
    expect(isEffectiveNumeric('-10.2.2')).toBe(false);
    expect(isEffectiveNumeric('0.2.2')).toBe(false);
    expect(isEffectiveNumeric(' 0.2.2')).toBe(false);
    expect(isEffectiveNumeric(' 0')).toBe(false);
    expect(isEffectiveNumeric('0 ')).toBe(false);
    expect(isEffectiveNumeric('10e0.2')).toBe(false);
    expect(isEffectiveNumeric('10e2.0')).toBe(false);
    expect(isEffectiveNumeric()).toBe(false);
    expect(isEffectiveNumeric(undefined)).toBe(false);
    expect(isEffectiveNumeric(null)).toBe(false);
    expect(isEffectiveNumeric([])).toBe(false);
    expect(isEffectiveNumeric({})).toBe(false);
    expect(isEffectiveNumeric(new Date())).toBe(false);
    expect(isEffectiveNumeric(new Date().toString())).toBe(false);
    expect(isEffectiveNumeric(function () { })).toBe(false);
    expect(isEffectiveNumeric(NaN)).toBe(false);

    // correct
    expect(isEffectiveNumeric(1)).toBe(true);
    expect(isEffectiveNumeric(-1)).toBe(true);
    expect(isEffectiveNumeric(0.1)).toBe(true);
    expect(isEffectiveNumeric(-0.1)).toBe(true);
    expect(isEffectiveNumeric('1')).toBe(true);
    expect(isEffectiveNumeric('-1')).toBe(true);
    expect(isEffectiveNumeric('-0.1')).toBe(true);
    expect(isEffectiveNumeric('10.22')).toBe(true);
    expect(isEffectiveNumeric('-10.22')).toBe(true);
    expect(isEffectiveNumeric(10e22)).toBe(true);
    expect(isEffectiveNumeric('10e22')).toBe(true);
    expect(isEffectiveNumeric('-10e22')).toBe(true);
    expect(isEffectiveNumeric('10e-22')).toBe(true);
    expect(isEffectiveNumeric(Infinity)).toBe(true);
    expect(isEffectiveNumeric(-Infinity)).toBe(true);
    expect(isEffectiveNumeric(1.7976931348623157e+308)).toBe(true);
  });
});
