import { assert, expect } from 'chai';

import formatMoney from '../src/formatMoney';

describe('formatMoney', ()=>{

  describe('输入金额 - string', ()=>{
    it('正数 - 输入 1000 : string 返回 1000.00 : string', ()=>{
      expect(formatMoney('1000')).to.be.equal('1,000.00');
    });
    it('负数 - 输入 1000 : string 返回 1000.00 : string', ()=>{
      expect(formatMoney('-1000')).to.be.equal('-1,000.00');
    });
    it('小数 - 输入 3000.03 : string 返回 3,000.03 : string', ()=>{
      expect(formatMoney('3000.03')).to.be.equal('3,000.03');
    });
    it('小数 -  输入 -3000.03 : string 返回 -3,000.03 : string', ()=>{
      expect(formatMoney('-3000.03')).to.be.equal('-3,000.03');
    });
  });

  describe('输入金额 - number', ()=>{
    it('正数 - 输入 1000 : number 返回 1000.00 : number', ()=>{
      expect(formatMoney(1000)).to.be.equal('1,000.00');
    });
    it('负数 - 输入 -1000 : number 返回 -1000.00 : number', ()=>{
      expect(formatMoney(-1000)).to.be.equal('-1,000.00');
    });
    it('小数 - 正数', ()=>{
      expect(formatMoney(3000.03)).to.be.equal('3,000.03');
    });
    it('小数 - 负数', ()=>{
      expect(formatMoney(-3000.03)).to.be.equal('-3,000.03');
    });
  });

  describe('输入保留位数', ()=>{
    it('默认值', ()=>{
      expect(formatMoney('1500')).to.be.equal('1,500.00');
    });
    it('2位', ()=>{
      const options = {precision: 2};
      expect(formatMoney('1500', options)).to.be.equal('1,500.00');
      expect(formatMoney('1500.2', options)).to.be.equal('1,500.20');
    });
    it('5位', ()=>{
      const options = {precision: 3};
      expect(formatMoney('1500', options)).to.be.equal('1,500.000');
      expect(formatMoney('1500.2', options)).to.be.equal('1,500.200');
    });
    it('8位', ()=>{
      const options = {precision: 8};
      expect(formatMoney('1500', options)).to.be.equal('1,500.00000000');
      expect(formatMoney('1500.2', options)).to.be.equal('1,500.20000000');
    });
    it('10位', ()=>{
      const options = {precision: 10};
      expect(formatMoney('1500',options)).to.be.equal('1,500.0000000000');
      expect(formatMoney('1500.2', options)).to.be.equal('1,500.2000000000');
    });
  });

  // 输入金额类型测试
  describe('输入金额类型测试', ()=>{
    const options = {precision: 2};
    it('number', ()=>{
      expect(formatMoney(+1000.000)).to.be.equal('1,000.00');
      expect(formatMoney(-1000)).to.be.equal('-1,000.00');
      expect(formatMoney(-1000, options)).to.be.equal('-1,000.00');
    });
    it('string', ()=>{
      expect(formatMoney('+1000.000')).to.be.equal('1,000.00');
      expect(formatMoney('-1000')).to.be.equal('-1,000.00');
      expect(formatMoney('-1000', options)).to.be.equal('-1,000.00');
    });
    it('boolean', ()=>{
      expect(formatMoney(true)).to.be.equal('');
      expect(formatMoney(false)).to.be.equal('');
    });
    it('NaN', ()=>{
      expect(formatMoney(NaN)).to.be.equal('');
    });
    it('undefined', ()=>{
      expect(formatMoney(undefined)).to.be.equal('');
    });
    it('null', ()=>{
      expect(formatMoney(null)).to.be.equal('');
    });
  });

  // 输入位数类型测试
  describe('输入位数类型测试', ()=>{
    it('number - {precision: 2}', ()=>{
      expect(formatMoney(1000.123456, {precision: 2})).to.be.equal('1,000.12');
    });

    it('number - {precision: 4}', ()=>{
      expect(formatMoney(-1000.123456,{precision: 4})).to.be.equal('-1,000.1235');
    });

    it('number - {precision: 10}', ()=>{
      expect(formatMoney(-1000.123456,{precision: 10})).to.be.equal('-1,000.1234560000');
    });

    it('number - {precision: 11}', ()=>{
      expect(formatMoney(-1000.123456,{precision: 11})).to.be.equal('-1,000.1234560000');
    });

    it('string - {precision: \'2\'}', ()=>{
      expect(formatMoney(1000.123456, {precision: '2'})).to.be.equal('1,000.12');
    });

    it('string - {precision: \'4\'}', ()=>{
      expect(formatMoney(-1000.123456, {precision: '4'})).to.be.equal('-1,000.1235');
    });

    it('string - {precision: \'10\'}', ()=>{
      expect(formatMoney(-1000.123456, {precision: '10'})).to.be.equal('-1,000.1234560000');
    });

    it('string - {precision: \'11\'}', ()=>{
      expect(formatMoney(-1000.123456, {precision: '11'})).to.be.equal('-1,000.1234560000');
    });

    it('boolean - {precision: true}', ()=>{
      expect(formatMoney(1000.123456, {precision: true})).to.be.equal('1,000.12');
    });

    it('boolean - {precision: false}', ()=>{
      expect(formatMoney(-1000.123456), {precision: false}).to.be.equal('-1,000.12');
    });

    it('NaN', ()=>{
      expect(formatMoney(1000.123456, {precision: NaN})).to.be.equal('1,000.12');
    });
    it('undefined', ()=>{
      expect(formatMoney(1000.123456, {precision: undefined})).to.be.equal('1,000.12');
    });
    it('null', ()=>{
      expect(formatMoney(1000.123456, {precision: null})).to.be.equal('1,000.12');
    });
  });

  // 测试symbol

  describe('测试symbol', ()=>{
    it('/', ()=>{
      expect(formatMoney(1000.00, { symbol: '/'} )).to.be.equal('/1,000.00');
    });
    it('$', ()=>{
      expect(formatMoney(1000.00, { symbol: '$'})).to.be.equal('$1,000.00');
    });
    it('¥', ()=>{
      expect(formatMoney(1000.00, { symbol: '¥'})).to.be.equal('¥1,000.00');
    });

    it('.', ()=>{
      expect(formatMoney(1000.00, { symbol: '.'})).to.be.equal('.1,000.00');
    });
  });

  // 测试thousand
  describe('测试thousand', ()=>{
    it('|', ()=>{
      expect(formatMoney(1000.00, { thousand: '|'})).to.be.equal('1|000.00');
    });
    it(' ', ()=>{
      expect(formatMoney(1000.00, { thousand: ' '})).to.be.equal('1 000.00');
    });
    it('a', ()=>{
      expect(formatMoney(1000.00, { thousand: 'a'})).to.be.equal('1a000.00');
    });
  });

  describe('测试decimal', ()=>{
    it(' ', ()=>{
      expect(formatMoney(1000.00, { decimal: ' ' })).to.be.equal('1,000 00');
    });
    it('&', ()=>{
      expect(formatMoney(1000.00, { decimal: '&' })).to.be.equal('1,000&00');
    });
    it('？', ()=>{
      expect(formatMoney(1000.00, { decimal: '?' })).to.be.equal('1,000?00');
    });
  });

  // 边界值测试
  describe('边界值测试', ()=>{
    it('测试最大值 9007199254740991', ()=>{
      expect(formatMoney(9007199254740991)).to.be.equal('9,007,199,254,740,991.00');
    });
    it('测试最小值 -9007199254740991', ()=>{
      expect(formatMoney(-9007199254740991)).to.be.equal('-9,007,199,254,740,991.00');
    });
    it('测试溢出最大值 9007199254740992', ()=>{
      expect(formatMoney(9007199254740992)).to.be.equal('');
    });
    it('测试溢出最小值 -9007199254740992', ()=>{
      expect(formatMoney(-9007199254740992)).to.be.equal('');
    });
  });
});

