import {
    expect
} from 'chai';

import isNumber from '../../src/type/isNumber'

describe('isNumber', () => {
    it('1 => true', () => {
        expect(isNumber(1)).to.be.equal(true);
    });
    it('Number.MIN_VALUE => true', () => {
        expect(isNumber(Number.MIN_VALUE)).to.be.equal(true);
    });
    it('Infinity => true', () => {
        expect(isNumber(Infinity)).to.be.equal(true);
    });
    it('NaN => true', () => {
        expect(isNumber(NaN)).to.be.equal(true);
    });
    it('"1" => false', () => {
        expect(isNumber("1")).to.be.equal(false);
    });
})