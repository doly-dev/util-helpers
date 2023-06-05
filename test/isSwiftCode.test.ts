import { isSwiftCode } from '../src';

describe('isSwiftCode', () => {
  it('错误数据', () => {
    // @ts-ignore
    expect(isSwiftCode()).toBe(false);
    expect(isSwiftCode(' ')).toBe(false);
    expect(isSwiftCode(true)).toBe(false);
    expect(isSwiftCode(123)).toBe(false);
    expect(isSwiftCode('h1307098')).toBe(false);
    expect(isSwiftCode('abcdefgh')).toBe(false);
    expect(isSwiftCode('123456789')).toBe(false);
    expect(isSwiftCode('12345678901')).toBe(false);
    expect(isSwiftCode('deutdeff')).toBe(false);
    expect(isSwiftCode('DEUTDEFF1')).toBe(false);
    expect(isSwiftCode('DEUTDEFF12')).toBe(false);
    expect(isSwiftCode('DEUTDEFF1234')).toBe(false);
    expect(isSwiftCode('010BKTWTWTP')).toBe(false);
  });

  it('正确数据', () => {
    // 德国法兰克福的德意志银行总行
    expect(isSwiftCode('DEUTDEFF')).toBe(true);
    // 中国台湾银行台中分行
    expect(isSwiftCode('BKTWTWTP010')).toBe(true);
    // 中国工商银行北京分行
    expect(isSwiftCode('ICBKCNBJBJM')).toBe(true);
    // 东京证券交易所
    expect(isSwiftCode('XTKSJPJ1')).toBe(true);
    // 韩国期货交易所
    expect(isSwiftCode('XKFEKR21')).toBe(true);
  });
});
