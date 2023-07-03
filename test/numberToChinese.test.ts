import { numberToChinese } from '../src';

describe('numberToChinese', () => {
  it(`incorrect`, () => {
    // @ts-ignore
    expect(numberToChinese()).toBe('');
    // @ts-ignore
    expect(numberToChinese(null)).toBe('');
    // @ts-ignore
    expect(numberToChinese(false)).toBe('');
    // @ts-ignore
    expect(numberToChinese(true)).toBe('');
    // @ts-ignore
    expect(numberToChinese('')).toBe('');
    // @ts-ignore
    expect(numberToChinese([])).toBe('');
  });

  it('整数', () => {
    expect(numberToChinese(0)).toBe('零');
    expect(numberToChinese(10)).toBe('一十');
    expect(numberToChinese(11)).toBe('一十一');
    expect(numberToChinese(100)).toBe('一百');
    expect(numberToChinese(101)).toBe('一百零一');
    expect(numberToChinese(10000)).toBe('一万');
    expect(numberToChinese(10001)).toBe('一万零一');
    expect(numberToChinese(100000000)).toBe('一亿');
    expect(numberToChinese(1000101)).toBe('一百万零一百零一');
    expect(numberToChinese(1234567890)).toBe('一十二亿三千四百五十六万七千八百九十');
  });

  it('小数', () => {
    expect(numberToChinese(0.1)).toBe('零点一');
    expect(numberToChinese(100.1)).toBe('一百点一');
    expect(numberToChinese(101.001)).toBe('一百零一点零零一');
    expect(numberToChinese(1234567890.11)).toBe('一十二亿三千四百五十六万七千八百九十点一一');
    expect(numberToChinese(1234567890.112)).toBe('一十二亿三千四百五十六万七千八百九十点一一二');
  });

  it('负数', () => {
    expect(numberToChinese(-0)).toBe('零');
    expect(numberToChinese(-100)).toBe('负一百');
    expect(numberToChinese(-10000)).toBe('负一万');
    expect(numberToChinese(-100000000)).toBe('负一亿');
    expect(numberToChinese(-1000101)).toBe('负一百万零一百零一');
    expect(numberToChinese(-1234567890)).toBe('负一十二亿三千四百五十六万七千八百九十');
    expect(numberToChinese(-0.1)).toBe('负零点一');
    expect(numberToChinese(-100.1)).toBe('负一百点一');
    expect(numberToChinese(-1234567890.11)).toBe('负一十二亿三千四百五十六万七千八百九十点一一');
  });

  it('繁体', () => {
    expect(numberToChinese(100, { big5: true })).toBe('壹佰');
    expect(numberToChinese(0.1, { big5: true })).toBe('零點壹');
    expect(numberToChinese(100.1, { big5: true })).toBe('壹佰點壹');
    expect(numberToChinese(1234567890, { big5: true })).toBe('壹拾贰亿叁仟肆佰伍拾陆万柒仟捌佰玖拾');
    expect(numberToChinese(1234567890.11, { big5: true })).toBe('壹拾贰亿叁仟肆佰伍拾陆万柒仟捌佰玖拾點壹壹');
  });

  it('不带单位', () => {
    expect(numberToChinese(1990, { unit: false })).toBe('一九九零');
    expect(numberToChinese(101.001, { unit: false })).toBe('一零一点零零一');
    expect(numberToChinese(101.001, { unit: false, big5: true })).toBe('壹零壹點零零壹');
    expect(numberToChinese(101.001, { unit: false, big5: true, decimal: '点' })).toBe('壹零壹点零零壹');
    expect(numberToChinese(1990, { unit: false, zero: '〇' })).toBe('一九九〇');
    expect(numberToChinese(1990, { unit: false, big5: true })).toBe('壹玖玖零');
    expect(numberToChinese(0.3, { unit: false, big5: true })).toBe('零點叁');
    expect(numberToChinese(1990.3, { unit: false, big5: true })).toBe('壹玖玖零點叁');
  });

  it(`自定义万亿单位`, () => {
    expect(numberToChinese(1234567890, { unitConfig: {} })).toBe('一十二亿三千四百五十六万七千八百九十');
    expect(numberToChinese(1234567890, { big5: true, unitConfig: { w: '萬', y: '億' } })).toBe('壹拾贰億叁仟肆佰伍拾陆萬柒仟捌佰玖拾');
  });
});
