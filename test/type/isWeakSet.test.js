import {
    expect
} from 'chai';

import isWeakSet from '../../src/utils/type/isWeakSet'

describe('isWeakSet', () => {
    it('new WeakSet => true', () => {
        expect(isWeakSet(new WeakSet)).to.be.equal(true);
    });
    it('new Set => false', () => {
        expect(isWeakSet(new Set)).to.be.equal(false);
    });
})