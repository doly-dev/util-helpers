import {
    expect
} from 'chai';

import pattern from '../src/pattern'

describe('pattern 正则匹配', () => {
    it('非字符串 => false', () => {
        expect(pattern.isQQ(true)).to.be.equal(false);
    });

    describe('isPhone 检测值是否为手机号码', () => {
        it('"13000000000" => true', () => {
            expect(pattern.isPhone('13000000000')).to.be.equal(true);
        });
        it('"13000" => false', () => {
            expect(pattern.isPhone('13000')).to.be.equal(false);
        });
        it('"10000000000" => false', () => {
            expect(pattern.isPhone('10000000000')).to.be.equal(false);
        });
    })

    describe('isQQ 检测值是否为QQ号', () => {
        it('"12345" => true', () => {
            expect(pattern.isQQ('12345')).to.be.equal(true);
        });
        it('"012345" => false', () => {
            expect(pattern.isQQ('012345')).to.be.equal(false);
        });
        it('"1234" => false', () => {
            expect(pattern.isQQ('1234')).to.be.equal(false);
        });
        it('"1234567890123" => false', () => {
            expect(pattern.isQQ('1234567890123')).to.be.equal(false);
        });
    })
})