import {
    expect
} from 'chai';

import isString from '../../src/utils/type/isString'

describe('isString', () => {
    it('"abc" => true', () => {
        expect(isString('abc')).to.be.equal(true);
    });
    it('1 => false', () => {
        expect(isString(1)).to.be.equal(false);
    });
})