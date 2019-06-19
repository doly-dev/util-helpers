import { assert, expect } from 'chai';

import isPhoneNumber from '../src/isPhoneNumber';

describe('isPhoneNumber', ()=>{

    // 类型
    describe('类型', ()=>{
        it('数字 13000000000，返回 true', ()=>{
            expect(isPhoneNumber(13000000000)).to.be.equal(true);
        });
        it('字符串 13000000000，返回 true', ()=>{
            expect(isPhoneNumber('13000000000')).to.be.equal(true);
        });
        it('布尔值 true，返回 false', ()=>{
            expect(isPhoneNumber(true)).to.be.equal(false);
        });
        it('对象 null，返回 false', ()=>{
            expect(isPhoneNumber(null)).to.be.equal(false);
        });
        it('undefined，返回 false', ()=>{
            expect(isPhoneNumber()).to.be.equal(false);
        });
    });

    // 边界值
    describe('边界值', ()=>{
        it('非数字 abc， 返回 false', ()=>{
            expect(isPhoneNumber('acb')).to.be.equal(false);
        });
        it('5位数 13000， 返回 false', ()=>{
            expect(isPhoneNumber('13000')).to.be.equal(false);
        });
        it('15位数 130000000000000，返回 false', ()=>{
            expect(isPhoneNumber('130000000000000')).to.be.equal(false);
        });
        it('11位数且第二位不是[3456789] 10000000000，返回 false', ()=>{
            expect(isPhoneNumber('10000000000')).to.be.equal(false);
        });
        it('11位数 13000000000，返回 true', ()=>{
            expect(isPhoneNumber('13000000000')).to.be.equal(true);
        });
    });
})

