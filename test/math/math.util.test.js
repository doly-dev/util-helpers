import { strip, digitLength, float2Fixed } from '../../src/utils/math.util';

describe('strip', () => {
  it(`0.09999999999999998 => 0.1`, () => {
    expect(strip(0.09999999999999998)).toBe(0.1);
  });
  it(`1.0000000000000001 => 1`, () => {
    expect(strip(1.0000000000000001)).toBe(1);
  });
});

describe('digitLength', () => {
  it(`123.4567890123 => 10`, () => {
    expect(digitLength(123.4567890123)).toBe(10);
  });
  it(`1.23e-5 => 7`, () => {
    expect(digitLength(1.23e-5)).toBe(7);
  });
  it(`1.23E-5 => 7`, () => {
    expect(digitLength(1.23E-5)).toBe(7);
  });
  it(`1.233467e-5 => 11`, () => {
    expect(digitLength(1.233467e-5)).toBe(11);
  });
  it(`123.45e-5 => 7`, () => {
    expect(digitLength(123.45e-5)).toBe(7);
  });
  it(`1.23e-10 => 12`, () => {
    expect(digitLength(1.23e-10)).toBe(12);
  });
  it(`1.23e1 => 1`, () => {
    expect(digitLength(1.23e1)).toBe(1);
  });
  it(`1e20 => 0`, () => {
    expect(digitLength(1e20)).toBe(0);
  });
  it(`1.12345e20 => 0`, () => {
    expect(digitLength(1.12345e20)).toBe(0);
  });
  it(`1.123e30 => 0`, () => {
    expect(digitLength(1.123e30)).toBe(0);
  });
  it(`1.123e-100 => 103`, () => {
    expect(digitLength(1.123e-100)).toBe(103);
  });
});

describe('float2Fixed', () => {
  it(`1e-1 => 1`, () => {
    expect(float2Fixed(1e-1)).toBe(1);
  });
  it(`1e-6 => 1`, () => {
    expect(float2Fixed(1e-6)).toBe(1);
  });
  it(`1e-6 => 1`, () => {
    expect(float2Fixed(1e-6)).toBe(1);
  });
  it(`1e-13 => 1`, () => {
    expect(float2Fixed(1e-13)).toBe(1);
  });
  it(`1.123e30 => 1.123e30`, () => {
    expect(float2Fixed(1.123e30)).toBe(1.123e30);
  });
  it(`1.6e-30 => 16`, () => {
    expect(float2Fixed(1.6e-30)).toBe(16);
  });
  it(`1.234567e-13 => 1234567`, () => {
    expect(float2Fixed(1.234567e-13)).toBe(1234567);
  });
  it(`1.2345678912345e10 => 12345678912345`, () => {
    expect(float2Fixed(1.2345678912345e10)).toBe(12345678912345);
  });
  it(`0.000000123456 => 123456`, () => {
    expect(float2Fixed(0.000000123456)).toBe(123456);
  });
  it(`1.23456e-7 => 123456`, () => {
    expect(float2Fixed(1.23456e-7)).toBe(123456);
  });
});
