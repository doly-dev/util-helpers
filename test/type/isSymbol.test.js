import {
    expect
} from 'chai';

import isSymbol from '../../src/type/isSymbol'

describe('isSymbol', () => {
    it('Symbol.iterator => true', () => {
        expect(isSymbol(Symbol.iterator)).to.be.equal(true);
    });
    it('"abc" => false', () => {
        expect(isSymbol("abc")).to.be.equal(false);
    });
})