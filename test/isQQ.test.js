import {
    expect
} from 'chai';

import isQQ from '../src/isQQ';

describe('isQQ 检测值是否为有效的QQ号', () => {
    it('数字 12345 => true', () => {
        expect(isQQ(12345)).to.be.equal(true);
    });
    it('字符串 "12345" => true', () => {
        expect(isQQ('12345')).to.be.equal(true);
    });
    it('非数字或字符串 => false', () => {
        expect(isQQ(true)).to.be.equal(false);
    });
    it('0开头 => false', () => {
        expect(isQQ('012345')).to.be.equal(false);
    });
    it('不足5位数字 => false', () => {
        expect(isQQ(1234)).to.be.equal(false);
    });
    it('超过11位数字 => false', () => {
        expect(isQQ(1234567890123)).to.be.equal(false);
    });
})