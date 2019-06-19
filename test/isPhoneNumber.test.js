import { expect } from 'chai';

import isPhoneNumber from '../src/isPhoneNumber';

describe('isPhoneNumber 检测值是否为11位有效手机号码', ()=>{
    it('数字 13000000000 => true', ()=>{
        expect(isPhoneNumber(13000000000)).to.be.equal(true);
    });
    it('字符串 13000000000 => true', ()=>{
        expect(isPhoneNumber('13000000000')).to.be.equal(true);
    });
    it('非数字或字符串 => false', ()=>{
        expect(isPhoneNumber(true)).to.be.equal(false);
    });
    it('不足11位数字 => false', ()=>{
        expect(isPhoneNumber('13000')).to.be.equal(false);
    });
    it('11位数且第二位不是3456789 => false', ()=>{
        expect(isPhoneNumber('10000000000')).to.be.equal(false);
    });
})

