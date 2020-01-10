import {
  expect
} from 'chai';

import formatBankCard from '../../src/formatBankCard';

describe('formatBankCard', () => {
  it(`19位银行卡 "6228480402564890018" => 6228 4804 0256 4890 018`, () => {
    expect(formatBankCard('6228480402564890018')).to.be.equal('6228 4804 0256 4890 018');
  });
  it(`16位银行卡 "6228480402564890" => 6228 4804 0256 4890`, () => {
    expect(formatBankCard('6228480402564890')).to.be.equal('6228 4804 0256 4890');
  });
  it(`16位银行卡，"-"间隔 "6228480402564890" => 6228-4804-0256-4890`, () => {
    expect(formatBankCard('6228480402564890', { char: '-' })).to.be.equal('6228-4804-0256-4890');
  });
})