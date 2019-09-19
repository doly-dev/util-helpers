import {
    expect
} from 'chai';

import { formatBankCard, isBankCard } from '../src';

describe('utilHelpers', () => {
    it(`formatBankCard("6228480402564890018") => 6228 4804 0256 4890 018`, () => {
        expect(formatBankCard('6228480402564890018')).to.be.equal('6228 4804 0256 4890 018');
    });
    it('isBankCard("6228480402564890") => true', () => {
        expect(isBankCard('6228480402564890')).to.be.equal(true);
    });
})