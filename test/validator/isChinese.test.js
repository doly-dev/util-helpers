import {
    expect
} from 'chai';

import isChinese from '../../src/validator/isChinese'

describe('isChinese', () => {
    it('非字符串 => false', () => {
        expect(isChinese(true)).to.be.equal(false);
        expect(isChinese(123)).to.be.equal(false);
    });
    it('"林某某" => true', () => {
        expect(isChinese('林某某')).to.be.equal(true);
    });
    it('"林A" => false', () => {
        expect(isChinese('林A')).to.be.equal(false);
    });
    it('宽松模式，"林A" => true', () => {
        expect(isChinese('林A', { loose: true })).to.be.equal(true);
    });
})