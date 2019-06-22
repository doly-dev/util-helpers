import {
    expect
} from 'chai';

import isRegExp from '../../src/type/isRegExp'

describe('isRegExp', () => {
    it('/abc/ => true', () => {
        expect(isRegExp(/abc/)).to.be.equal(true);
    });
    it('"/abc/" => false', () => {
        expect(isRegExp('/abc/')).to.be.equal(false);
    });
})