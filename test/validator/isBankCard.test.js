import {
    expect
} from 'chai';

import isBankCard from '../../src/validator/isBankCard'

describe('isBankCard', () => {
    it('非字符串 => false', () => {
        expect(isBankCard(true)).to.be.equal(false);
        expect(isBankCard(123)).to.be.equal(false);
    });
    it('"6228480402564890018" => true', () => {
        expect(isBankCard('6228480402564890018')).to.be.equal(true);
    });
    it('"6228480402564890" => true', () => {
        expect(isBankCard('6228480402564890')).to.be.equal(true);
    });
    it('"123456789" => false', () => {
        expect(isBankCard('123456789')).to.be.equal(false);
    });
})