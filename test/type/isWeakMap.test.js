import {
    expect
} from 'chai';

import isWeakMap from '../../src/type/isWeakMap'

describe('isWeakMap', () => {
    it('new WeakMap => true', () => {
        expect(isWeakMap(new WeakMap)).to.be.equal(true);
    });
    it('new Map => false', () => {
        expect(isWeakMap(new Map)).to.be.equal(false);
    });
})