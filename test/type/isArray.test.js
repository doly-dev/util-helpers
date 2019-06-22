import {
    expect
} from 'chai';

import isArray from '../../src/type/isArray'

describe('isArray', () => {
    it('[] => true', () => {
        expect(isArray([])).to.be.equal(true);
    });
    it('1 => false', () => {
        expect(isArray(1)).to.be.equal(false);
    });
})