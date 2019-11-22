import { assert, expect } from 'chai';

import formatMoney from '../../src/formatMoney';

describe('formatMoney', () => {

  describe('输入金额 - string', () => {
    it('正数 - 输入 1000 : string, 返回 1,000.00 : string', () => {
      expect(formatMoney('1000')).to.be.equal('1,000.00');
    });
    it('负数 - 输入 1000 : string, 返回 -1,000.00 : string', () => {
      expect(formatMoney('-1000')).to.be.equal('-1,000.00');
    });
    it('小数(正数) - 输入 3000.03 : string, 返回 3,000.03 : string', () => {
      expect(formatMoney('3000.03')).to.be.equal('3,000.03');
    });
    it('小数(负数) -  输入 -3000.03 : string, 返回 -3,000.03 : string', () => {
      expect(formatMoney('-3000.03')).to.be.equal('-3,000.03');
    });
    it('测试最大值 输入9007199254740991: number, 返回 9,007,199,254,740,991.00: string', () => {
      expect(formatMoney(9007199254740991)).to.be.equal('9,007,199,254,740,991.00');
    });
    it('测试最小值 输入-9007199254740991: number, 返回 -9,007,199,254,740,991.00: string', () => {
      expect(formatMoney(-9007199254740991)).to.be.equal('-9,007,199,254,740,991.00');
    });
    it('测试溢出最大值 输入9007199254740992: number, 返回 \'\': string', () => {
      expect(formatMoney(9007199254740992)).to.be.equal('');
    });
    it('测试溢出最小值 输入-9007199254740992: number, 返回 \'\': string', () => {
      expect(formatMoney(-9007199254740992)).to.be.equal('');
    });
  });

  describe('输入金额 - number', () => {
    it('正数 - 输入 1000 : number，返回 1,000.00 : string', () => {
      expect(formatMoney(1000)).to.be.equal('1,000.00');
    });
    it('负数 - 输入 -1000 : number，返回 -1,000.00 : string', () => {
      expect(formatMoney(-1000)).to.be.equal('-1,000.00');
    });
    it('小数(正数) - 输入3000.03: number，返回 3,000.03 : string ', () => {
      expect(formatMoney(3000.03)).to.be.equal('3,000.03');
    });
    it('小数(负数) - 输入-3000.03: number，返回 -3,000.03: string ', () => {
      expect(formatMoney(-3000.03)).to.be.equal('-3,000.03');
    });
  });

  describe('输入保留位数', () => {
    it('默认值 - 输入 num = 1500 : string ，options = {precision: undefined}, 返回 1,500.00 : string', () => {
      expect(formatMoney('1500')).to.be.equal('1,500.00');
    });
    it('2位 - 输入 num = 1500.2 : string ，options = {precision: 2}, 返回 1,500.20 : string', () => {
      const options = { precision: 2 };
      expect(formatMoney('1500.2', options)).to.be.equal('1,500.20');
    });
    it('10位 - 输入 num = 1500.2 : string ，options = {precision: 10}, 返回 1,500.2000000000 : string', () => {
      const options = { precision: 10 };
      expect(formatMoney('1500.2', options)).to.be.equal('1,500.2000000000');
    });
    it('11位(溢出) - 输入 num = 1500.2 : string ，options = {precision: 11}, 返回 1,500.2000000000 : string', () => {
      const options = { precision: 11 };
      expect(formatMoney('1500.2', options)).to.be.equal('1,500.2000000000');
    });
    it('-2位(溢出) - 输入 num = 1500.2 : string ，options = {precision: -2}, 返回 1,500.20 : string', () => {
      const options = { precision: -2 };
      expect(formatMoney('1500.2', options)).to.be.equal('1,500.20');
    });
  });

  // 输入金额类型测试
  describe('输入金额类型测试', () => {
    it('number类型 - 输入 +1000.000: number, 返回 1,000.00: string', () => {
      expect(formatMoney(+1000.000)).to.be.equal('1,000.00');
    });
    it('number类型 - 输入 -1000: number, 返回 -1,000.00: string', () => {
      expect(formatMoney(-1000)).to.be.equal('-1,000.00');
    });
    it('number类型 - 输入 -1000: number, 返回', () => {
      const options = { precision: 2 };
      expect(formatMoney(-1000, options)).to.be.equal('-1,000.00');
    });
    it('string类型 - 输入 +1000.000: string, 返回 1,000.00: string', () => {
      expect(formatMoney('+1000.000')).to.be.equal('1,000.00');
    });
    it('string类型 - 输入 -1000.000: string, 返回 -1,000.00: string', () => {
      expect(formatMoney('-1000')).to.be.equal('-1,000.00');
    });
    it('string类型 - 输入 -1000.000: string, 返回 -1,000.00: string', () => {
      const options = { precision: 2 };
      expect(formatMoney('-1000', options)).to.be.equal('-1,000.00');
    });
    it('boolean类型 - 输入 true: boolean, 返回 \'\' string', () => {
      expect(formatMoney(true)).to.be.equal('');
    });
    it('boolean类型 - 输入 false: boolean, 返回 \'\' string', () => {
      expect(formatMoney(false)).to.be.equal('');
    });
    it('number类型（NaN） - 输入 NaN: number, 返回 \'\' string', () => {
      expect(formatMoney(NaN)).to.be.equal('');
    });
    it('undefined - 输入 undefined： undefined， 返回 \'\' string', () => {
      expect(formatMoney(undefined)).to.be.equal('');
    });
    it('null - 输入 null： null， 返回 \'\' string', () => {
      expect(formatMoney(null)).to.be.equal('');
    });
    it('\'\' - \'\' string， 返回 \'\' string', () => {
      expect(formatMoney('')).to.be.equal('');
    });
  });

  // 输入位数类型测试
  describe('输入位数类型测试', () => {
    it('number类型 - 输入 num = 1000.123456 options: {precision: 2}, 返回 1,000.12:string', () => {
      expect(formatMoney(1000.123456, { precision: 2 })).to.be.equal('1,000.12');
    });
    it('number类型 - 输入 num = -1000.123456: number options: {precision: 10}, 返回 -1,000.1234560000: string', () => {
      expect(formatMoney(-1000.123456, { precision: 10 })).to.be.equal('-1,000.1234560000');
    });
    it('number类型 - 输入 num = -1000.123456: number options: {precision: 11}，返回 -1,000.1234560000：string', () => {
      expect(formatMoney(-1000.123456, { precision: 11 })).to.be.equal('-1,000.1234560000');
    });
    it('string类型 - 输入num = 1000.123456：number  options: {precision: \'2\'}, 返回 1,000.12: string ', () => {
      expect(formatMoney(1000.123456, { precision: '2' })).to.be.equal('1,000.12');
    });
    it('string类型 - 输入num = -1000.123456：number  options: {precision: \'10\'}， 返回 -1,000.1234560000： string', () => {
      expect(formatMoney(-1000.123456, { precision: '10' })).to.be.equal('-1,000.1234560000');
    });
    it('string类型 - 输入num = -1000.123456：number  options: {precision: \'11\'}, 返回 -1,000.1234560000： string', () => {
      expect(formatMoney(-1000.123456, { precision: '11' })).to.be.equal('-1,000.1234560000');
    });
    it('boolean类型 - 输入num = 1000.123456：number  options: {precision: true} , 返回 1,000.12： string', () => {
      expect(formatMoney(1000.123456, { precision: true })).to.be.equal('1,000.12');
    });
    it('boolean类型 - 输入num = -1000.123456：number  options: {precision: false} , 返回 -1,000.12： string', () => {
      expect(formatMoney(-1000.123456), { precision: false }).to.be.equal('-1,000.12');
    });
    it('NaN - 输入num = 1000.123456：number  options: {precision: NaN}, 返回 1,000.12: string', () => {
      expect(formatMoney(1000.123456, { precision: NaN })).to.be.equal('1,000.12');
    });
    it('undefined - 输入num = 1000.123456：number  options: {precision: undefined}, 返回 1,000.12: string', () => {
      expect(formatMoney(1000.123456, { precision: undefined })).to.be.equal('1,000.12');
    });
    it('null - 输入num = 1000.123456：number  options: {precision: null}, 返回 1,000.12：string', () => {
      expect(formatMoney(1000.123456, { precision: null })).to.be.equal('1,000.12');
    });
  });

  // 测试symbol

  describe('测试symbol', () => {
    it('/ - 输入num = 1000.00：number  options: {symbol: \'/\'}, 返回 /1,000.00：string', () => {
      expect(formatMoney(1000.00, { symbol: '/' })).to.be.equal('/1,000.00');
    });
    it('$ - 输入num = 1000.00：number  options: {symbol: \'$\'}, 返回 $1,000.00：string', () => {
      expect(formatMoney(1000.00, { symbol: '$' })).to.be.equal('$1,000.00');
    });
    it('¥ - 输入num = 1000.00：number  options: {symbol: \'¥\'}, 返回 ¥1,000.00：string', () => {
      expect(formatMoney(1000.00, { symbol: '¥' })).to.be.equal('¥1,000.00');
    });
    it('. - 输入num = 1000.00：number  options: {symbol: \'.\'}, 返回 .1,000.00：string', () => {
      expect(formatMoney(1000.00, { symbol: '.' })).to.be.equal('.1,000.00');
    });
  });

  // 测试thousand
  describe('测试thousand', () => {
    it('| - 输入num = 1000.00：number  options: {thousand: \'|\'}, 返回 1|000.00：string', () => {
      expect(formatMoney(1000.00, { thousand: '|' })).to.be.equal('1|000.00');
    });
    it('\'\' - 输入num = 1000.00：number  options: {thousand: \'\'}, 返回 1 000.00：string', () => {
      expect(formatMoney(1000.00, { thousand: ' ' })).to.be.equal('1 000.00');
    });
    it('a - 输入num = 1000.00：number  options: {thousand: \'a\'}, 返回 1a000.00：string', () => {
      expect(formatMoney(1000.00, { thousand: 'a' })).to.be.equal('1a000.00');
    });
  });

  describe('测试decimal', () => {
    it('\'\' - 输入num = 1000.00：number  options: {thousand: \'\'}, 返回 1,000 00：string', () => {
      expect(formatMoney(1000.00, { decimal: ' ' })).to.be.equal('1,000 00');
    });
    it('& - 输入num = 1000.00：number  options: {thousand: \'&\'}, 返回 1,000&00：string', () => {
      expect(formatMoney(1000.00, { decimal: '&' })).to.be.equal('1,000&00');
    });
    it('？- 输入num = 1000.00：number  options: {thousand: \'?\'}, 返回 1,000?00：string', () => {
      expect(formatMoney(1000.00, { decimal: '?' })).to.be.equal('1,000?00');
    });
  });
});

