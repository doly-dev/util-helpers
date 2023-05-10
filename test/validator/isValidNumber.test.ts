import { isValidNumber } from '../../src';

describe('isValidNumber', () => {

  it('incorrent', () => {
    // @ts-ignore
    expect(isValidNumber()).toBe(false);
    expect(isValidNumber(undefined)).toBe(false);
    expect(isValidNumber('0.10.1')).toBe(false);
    expect(isValidNumber('a10.1')).toBe(false);
    expect(isValidNumber('10.1a')).toBe(false);
    expect(isValidNumber('abc')).toBe(false);
    expect(isValidNumber(NaN)).toBe(false);
    expect(isValidNumber({})).toBe(false);
    expect(isValidNumber(Symbol())).toBe(false);
    expect(isValidNumber(Object(Symbol()))).toBe(false);
  });

  it('special', () => {
    expect(isValidNumber(null)).toBe(true);
    expect(isValidNumber([])).toBe(true);
    expect(isValidNumber(true)).toBe(true);
    expect(isValidNumber(false)).toBe(true);
    expect(isValidNumber('')).toBe(true);
    expect(isValidNumber({ [Symbol.toPrimitive]() { return 123 } })).toBe(true);
    expect(isValidNumber({ valueOf() { return 123 } })).toBe(true);
    expect(isValidNumber(' 15')).toBe(true);
    expect(isValidNumber('15 ')).toBe(true);
    expect(isValidNumber(' 15 ')).toBe(true);
    expect(isValidNumber(' -15')).toBe(true);
    expect(isValidNumber('-15 ')).toBe(true);
    expect(isValidNumber(' -15 ')).toBe(true);
  });

  it('corrent', () => {
    expect(isValidNumber(0)).toBe(true);
    expect(isValidNumber('0')).toBe(true);
    expect(isValidNumber(-1)).toBe(true);
    expect(isValidNumber('-1')).toBe(true);
    expect(isValidNumber(1)).toBe(true);
    expect(isValidNumber('1')).toBe(true);
    expect(isValidNumber(10.10)).toBe(true);
    expect(isValidNumber('10.10')).toBe(true);
    expect(isValidNumber(Infinity)).toBe(true);
    expect(isValidNumber(-Infinity)).toBe(true);
  });

  it('strict', () => {
    expect(isValidNumber(undefined, true)).toBe(false);
    expect(isValidNumber('0.10.1', true)).toBe(false);
    expect(isValidNumber('a10.1', true)).toBe(false);
    expect(isValidNumber('10.1a', true)).toBe(false);
    expect(isValidNumber('abc', true)).toBe(false);
    expect(isValidNumber(NaN, true)).toBe(false);
    expect(isValidNumber({}, true)).toBe(false);
    expect(isValidNumber(Symbol(), true)).toBe(false);
    expect(isValidNumber(Object(Symbol()), true)).toBe(false);

    expect(isValidNumber(null, true)).toBe(false);
    expect(isValidNumber([], true)).toBe(false);
    expect(isValidNumber(true, true)).toBe(false);
    expect(isValidNumber(false, true)).toBe(false);
    expect(isValidNumber('', true)).toBe(false);
    expect(isValidNumber({ [Symbol.toPrimitive]() { return 123 } }, true)).toBe(false);
    expect(isValidNumber({ valueOf() { return 123 } }, true)).toBe(false);
    expect(isValidNumber(' 15', true)).toBe(true);
    expect(isValidNumber('15 ', true)).toBe(true);
    expect(isValidNumber(' 15 ', true)).toBe(true);
    expect(isValidNumber(' -15', true)).toBe(true);
    expect(isValidNumber('-15 ', true)).toBe(true);
    expect(isValidNumber(' -15 ', true)).toBe(true);

    expect(isValidNumber(0, true)).toBe(true);
    expect(isValidNumber('0', true)).toBe(true);
    expect(isValidNumber(-1, true)).toBe(true);
    expect(isValidNumber('-1', true)).toBe(true);
    expect(isValidNumber(1, true)).toBe(true);
    expect(isValidNumber('1', true)).toBe(true);
    expect(isValidNumber(10.10, true)).toBe(true);
    expect(isValidNumber('10.10', true)).toBe(true);
    expect(isValidNumber(Infinity, true)).toBe(true);
    expect(isValidNumber(-Infinity, true)).toBe(true);
  });

});