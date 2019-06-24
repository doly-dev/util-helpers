import {
    expect
} from 'chai';

import isIPv4 from '../../src/validator/isIPv4'

describe('isIPv4', () => {
    it('非字符串 => false', () => {
        expect(isIPv4(true)).to.be.equal(false);
        expect(isIPv4(123)).to.be.equal(false);
    });
    it('"192.168.1.1" => true', () => {
        expect(isIPv4('192.168.1.1')).to.be.equal(true);
    });
    it('"255.255.255.255" => true', () => {
        expect(isIPv4('255.255.255.255')).to.be.equal(true);
    });
    it('"256.256.256.256" => false', () => {
        expect(isIPv4('256.256.256.256')).to.be.equal(false);
    });
    it('"0.0.0" => false', () => {
        expect(isIPv4('0.0.0')).to.be.equal(false);
    });
})