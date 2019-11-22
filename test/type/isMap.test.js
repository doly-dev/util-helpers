import {
    expect
} from 'chai';

import isMap from '../../src/utils/type/isMap'

describe('isMap', () => {
    it('new Map => true', () => {
        expect(isMap(new Map)).to.be.equal(true);
    });
    it('new WeakMap => false', () => {
        expect(isMap(new WeakMap)).to.be.equal(false);
    });
})