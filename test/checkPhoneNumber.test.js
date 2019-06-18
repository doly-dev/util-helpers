import { assert, expect } from 'chai';

import checkPhoneNumber from '../src/checkPhoneNumber';

describe('checkPhoneNumber', ()=>{

    // 类型
    describe('类型', ()=>{
        it('数字', ()=>{
            expect(checkPhoneNumber(13000000000)).to.be.equal(true);
        });
        it('字符串', ()=>{
            expect(checkPhoneNumber('13000000000')).to.be.equal(true);
        });
        it('布尔值', ()=>{
            expect(checkPhoneNumber(true)).to.be.equal(false);
        });
        it('对象', ()=>{
            expect(checkPhoneNumber(null)).to.be.equal(false);
        });
        it('undefined', ()=>{
            expect(checkPhoneNumber()).to.be.equal(false);
        });
    });

    // 长度
    describe('长度', ()=>{
        it('5位', ()=>{
            expect(checkPhoneNumber('1500')).to.be.equal(false);
        });
        it('11位', ()=>{
            expect(checkPhoneNumber('13000000000')).to.be.equal(true);
        });
        it('15位', ()=>{
            expect(checkPhoneNumber('130000000000000')).to.be.equal(false);
        });
    });

    // 正则界限值
    describe('界限值', ()=>{
        it('10000000000', ()=>{
            expect(checkPhoneNumber('10000000000')).to.be.equal(false);
        });
        it('11000000000', ()=>{
            expect(checkPhoneNumber('10000000000')).to.be.equal(false);
        });
        it('12000000000', ()=>{
            expect(checkPhoneNumber('12000000000')).to.be.equal(false);
        });
        it('13000000000', ()=>{
            expect(checkPhoneNumber('13000000000')).to.be.equal(true);
        });
    });
})

