import {
    expect
} from 'chai';

import isNull from '../../src/utils/type/isNull'

describe('isNull', () => {
    it('null => true', () => {
        expect(isNull(null)).to.be.equal(true);
    });
    it('false => false', () => {
        expect(isNull(false)).to.be.equal(false);
    });
})