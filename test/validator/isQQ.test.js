import {
    expect
} from 'chai';

import isQQ from '../../src/validator/isQQ'

describe('isQQ', () => {
    it('非字符串 => false', () => {
        expect(isQQ(true)).to.be.equal(false);
        expect(isQQ(123)).to.be.equal(false);
    });
    it('"12345" => true', () => {
        expect(isQQ('12345')).to.be.equal(true);
    });
    it('"012345" => false', () => {
        expect(isQQ('012345')).to.be.equal(false);
    });
    it('"1234" => false', () => {
        expect(isQQ('1234')).to.be.equal(false);
    });
    it('"1234567890123" => false', () => {
        expect(isQQ('1234567890123')).to.be.equal(false);
    });
})