import {
    expect
} from 'chai';

import isDate from '../../src/type/isDate'

describe('isDate', () => {
    it('new Date => true', () => {
        expect(isDate(new Date)).to.be.equal(true);
    });
    it('Mon April 23 2012 => false', () => {
        expect(isDate('Mon April 23 2012')).to.be.equal(false);
    });
})