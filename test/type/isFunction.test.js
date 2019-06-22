import {
    expect
} from 'chai';

import isFunction from '../../src/type/isFunction'

describe('isFunction', () => {
    it('()=>{} => true', () => {
        expect(isFunction(() => { })).to.be.equal(true);
    });
    it('/abc/ => false', () => {
        expect(isFunction(/abc/)).to.be.equal(false);
    });
})