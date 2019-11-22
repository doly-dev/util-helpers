import {
    expect
} from 'chai';

import isMobile from '../../src/isMobile'


describe('isMobile', () => {
    it('非字符串 => false', () => {
        expect(isMobile(true)).to.be.equal(false);
        expect(isMobile(123)).to.be.equal(false);
    });
    it('"13000000000" => true', () => {
        expect(isMobile('13000000000')).to.be.equal(true);
    });
    it('"13000" => false', () => {
        expect(isMobile('13000')).to.be.equal(false);
    });
    it('"10000000000" => false', () => {
        expect(isMobile('10000000000')).to.be.equal(false);
    });
})