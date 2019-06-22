import {
    expect
} from 'chai';

import isObject from '../../src/type/isObject'

describe('isObject', () => {
    it('{} => true', () => {
        expect(isObject({})).to.be.equal(true);
    });
    it('[1,2,3] => true', () => {
        expect(isObject([1, 2, 3])).to.be.equal(true);
    });
    it('null => false', () => {
        expect(isObject(null)).to.be.equal(false);
    });
})