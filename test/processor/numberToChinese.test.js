import { numberToChinese } from '../../src';

describe('numberToChinese', () => {
  it('should be defined', () => {
    expect(numberToChinese).toBeDefined();
  });

  it(`100 => 一百`, () => {
    expect(numberToChinese(100)).toBe('一百');
  });
  it(`100.1 => 一百点一`, () => {
    expect(numberToChinese(100.1)).toBe('一百点一');
  });
  it(`100 繁体 => 壹佰`, () => {
    expect(numberToChinese(100, { big5: true })).toBe('壹佰');
  });
  it(`100.1 => 壹佰点壹`, () => {
    expect(numberToChinese(100.1, { big5: true })).toBe('壹佰点壹');
  });
  it(`1990 不带单位 => 一九九零`, () => {
    expect(numberToChinese(1990, { unit: false })).toBe('一九九零');
  });
  it(`1990 不带单位，0=〇 => 一九九〇`, () => {
    expect(numberToChinese(1990, { unit: false, zero: '〇' })).toBe('一九九〇');
  });
  it(`1990 不带单位，繁体 => 壹玖玖零`, () => {
    expect(numberToChinese(1990, { big5: true, unit: false })).toBe('壹玖玖零');
  });
  it(`1990.3 不带单位，繁体 => 壹玖玖零点叁`, () => {
    expect(numberToChinese(1990.3, { big5: true, unit: false })).toBe('壹玖玖零点叁');
  });
  it(`1234567890 => 一十二亿三千四百五十六万七千八百九十`, () => {
    expect(numberToChinese(1234567890)).toBe('一十二亿三千四百五十六万七千八百九十');
  });
  it(`1234567890 繁体 => 壹拾贰亿叁仟肆佰伍拾陆万柒仟捌佰玖拾`, () => {
    expect(numberToChinese(1234567890, { big5: true })).toBe('壹拾贰亿叁仟肆佰伍拾陆万柒仟捌佰玖拾');
  });
  it(`1234567890 繁体，配置萬、億 => 壹拾贰億叁仟肆佰伍拾陆萬柒仟捌佰玖拾`, () => {
    expect(numberToChinese(1234567890, { big5: true, unitConfig: { w: '萬', y: '億' } })).toBe('壹拾贰億叁仟肆佰伍拾陆萬柒仟捌佰玖拾');
  });
})