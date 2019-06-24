import {
    expect
} from 'chai';

import isPassport from '../../src/validator/isPassport'

describe('isPassport', () => {
    it('非字符串 => false', () => {
        expect(isPassport(true)).to.be.equal(false);
        expect(isPassport(123)).to.be.equal(false);
    });
    it('"E12345678" => true', () => {
        expect(isPassport('E12345678')).to.be.equal(true);
    });
    it('"abc" => false', () => {
        expect(isPassport('abc')).to.be.equal(false);
    });
})