import {
    expect
} from 'chai';

import isBoolean from '../../src/type/isBoolean'

describe('isBoolean', () => {
    it('false => true', () => {
        expect(isBoolean(false)).to.be.equal(true);
    });
    it('null => false', () => {
        expect(isBoolean(null)).to.be.equal(false);
    });
})