import { formatMoney } from '../../src';

// console.log(formatMoney('-1000.123456', {precision:10}))

describe('formatMoney', () => {
  it('should be defined', () => {
    expect(formatMoney).toBeDefined();
  });

  it('输入金额 - string', () => {
    expect(formatMoney('010')).toBe('10.00');
    expect(formatMoney('0010')).toBe('10.00');
    expect(formatMoney('0010')).toBe('10.00');
    expect(formatMoney('0010.01')).toBe('10.01');
    expect(formatMoney('000.01')).toBe('0.01');
    expect(formatMoney('1000')).toBe('1,000.00');
    expect(formatMoney('-1000')).toBe('-1,000.00');
    expect(formatMoney('3000.03')).toBe('3,000.03');
    expect(formatMoney('-3000.03')).toBe('-3,000.03');
    expect(formatMoney('9007199254740991')).toBe('9,007,199,254,740,991.00');
    expect(formatMoney('-9007199254740991')).toBe('-9,007,199,254,740,991.00');
    expect(formatMoney('9007199254740992')).toBe('9,007,199,254,740,992.00');
    expect(formatMoney('40833293563290239918163922168323157340193394658892337376669999999999999951662')).toBe('40,833,293,563,290,239,918,163,922,168,323,157,340,193,394,658,892,337,376,669,999,999,999,999,951,662.00');
    expect(formatMoney('-9007199254740992')).toBe('-9,007,199,254,740,992.00');
    expect(formatMoney('0x11')).toBe('');
  });

  it('输入金额 - number', () => {
    expect(formatMoney(1000)).toBe('1,000.00');
    expect(formatMoney(-1000)).toBe('-1,000.00');
    expect(formatMoney(3000.03)).toBe('3,000.03');
    expect(formatMoney(-3000.03)).toBe('-3,000.03');
    expect(formatMoney(1.054e2)).toBe('105.40');
    expect(formatMoney(Infinity)).toBe('');
    expect(formatMoney(-Infinity)).toBe('');
    expect(formatMoney(0x11)).toBe('17.00');
  });

  it('输入保留位数', () => {
    expect(formatMoney('1500')).toBe('1,500.00');
    expect(formatMoney('1500.2', { precision: 2 })).toBe('1,500.20');
    expect(formatMoney('1500.2', { precision: 10 })).toBe('1,500.2000000000');
    expect(formatMoney('1500.2', { precision: 11 })).toBe('1,500.2000000000');
    expect(formatMoney('1500.2', { precision: -2 })).toBe('1,500.20');
    expect(formatMoney('1500.2', { precision: 0 })).toBe('1,500');
  });

  it('输入金额类型测试', () => {
    expect(formatMoney(+1000.0)).toBe('1,000.00');
    expect(formatMoney(-1000)).toBe('-1,000.00');
    expect(formatMoney(-1000, { precision: 2 })).toBe('-1,000.00');
    expect(formatMoney('+1000.000')).toBe('1,000.00');
    expect(formatMoney('-1000')).toBe('-1,000.00');
    expect(formatMoney('-1000', { precision: 2 })).toBe('-1,000.00');

    // @ts-ignore
    expect(formatMoney(true)).toBe('');
    // @ts-ignore
    expect(formatMoney(false)).toBe('');
    expect(formatMoney(NaN)).toBe('');
    // @ts-ignore
    expect(formatMoney(undefined)).toBe('');
    // @ts-ignore
    expect(formatMoney(null)).toBe('');
    expect(formatMoney('')).toBe('');
  });

  it('输入位数类型测试', () => {
    expect(formatMoney(1000.123456, { precision: 2 })).toBe('1,000.12');
    expect(formatMoney(-1000.123456, { precision: 10 })).toBe('-1,000.1234560000');
    expect(formatMoney(-1000.123456, { precision: 11 })).toBe('-1,000.1234560000');
    expect(formatMoney(1000.123456, { precision: 2 })).toBe('1,000.12');
    expect(formatMoney(-1000.123456, { precision: 10 })).toBe('-1,000.1234560000');
    expect(formatMoney(-1000.123456, { precision: 11 })).toBe('-1,000.1234560000');
    // @ts-ignore
    expect(formatMoney(1000.123456, { precision: true })).toBe('1,000.12');
    // @ts-ignore
    expect(formatMoney(-1000.123456, { precision: false })).toBe('-1,000.12');
    expect(formatMoney(1000.123456, { precision: NaN })).toBe('1,000.12');
    expect(formatMoney(1000.123456, { precision: undefined })).toBe('1,000.12');
    // @ts-ignore
    expect(formatMoney(1000.123456, { precision: null })).toBe('1,000.12');
  });

  it('测试symbol', () => {
    expect(formatMoney(1000.0, { symbol: '/' })).toBe('/1,000.00');
    expect(formatMoney(1000.0, { symbol: '$' })).toBe('$1,000.00');
    expect(formatMoney(1000.0, { symbol: '¥' })).toBe('¥1,000.00');
    expect(formatMoney(1000.0, { symbol: '.' })).toBe('.1,000.00');
  });

  it('测试thousand', () => {
    expect(formatMoney(1000.0, { thousand: '|' })).toBe('1|000.00');
    expect(formatMoney(1000.0, { thousand: ' ' })).toBe('1 000.00');
    expect(formatMoney(1000.0, { thousand: 'a' })).toBe('1a000.00');

    // 非法配置值
    // @ts-ignore
    expect(formatMoney(1000.0, { thousand: null })).toBe('1,000.00');
    // @ts-ignore
    expect(formatMoney(1000.0, { thousand: false })).toBe('1,000.00');
  });

  it('测试decimal', () => {
    expect(formatMoney(1000.0, { decimal: ' ' })).toBe('1,000 00');
    expect(formatMoney(1000.0, { decimal: '&' })).toBe('1,000&00');
    expect(formatMoney(1000.0, { decimal: '?' })).toBe('1,000?00');

    // 非法配置值
    // @ts-ignore
    expect(formatMoney(1000.0, { decimal: false })).toBe('1,000.00');
    // @ts-ignore
    expect(formatMoney(1000.0, { decimal: null })).toBe('1,000.00');
  });
});
