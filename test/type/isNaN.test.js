import {
    expect
} from 'chai';

import isNaN from '../../src/type/isNaN'

describe('isNaN', () => {
    it('NaN => true', () => {
        expect(isNaN(NaN)).to.be.equal(true);
    });
    it('1 => false', () => {
        expect(isNaN(1)).to.be.equal(false);
    });
})