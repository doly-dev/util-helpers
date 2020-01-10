import {
  expect
} from 'chai';

import plus from '../../src/plus';

describe('plus', () => {
  it(`0.1 + 0.2 = 0.3`, () => {
    expect(plus(0.1, 0.2)).to.be.equal(0.3);
  });
  it(`2.3 + 2.4 = 4.7`, () => {
    expect(plus(2.3, 2.4)).to.be.equal(4.7);
  });
  it(`-1.6 + -1 = -2.6`, () => {
    expect(plus(-1.6, -1)).to.be.equal(-2.6);
  });
  it(`-2.0 + 63 = 61`, () => {
    expect(plus(-2.0, 63)).to.be.equal(61);
  });
  it(`-3 + 7 = 4`, () => {
    expect(plus(-3, 7)).to.be.equal(4);
  });
  it(`-221 + 38 = -183`, () => {
    expect(plus(-221, 38)).to.be.equal(-183);
  });
  it(`-1 + 0 = -1`, () => {
    expect(plus(-1, 0)).to.be.equal(-1);
  });
  it(`2.018 + 0.001 = 2.019`, () => {
    expect(plus(2.018, 0.001)).to.be.equal(2.019);
  });
  it(`1.3224e10 + 1.3224e3 = 13224001322.4`, () => {
    expect(plus(1.3224e10, 1.3224e3)).to.be.equal(13224001322.4);
  });
  it(`1.6e-30 + 1.6e-30 = 3.2e-30`, () => {
    expect(plus(1.6e-30, 1.6e-30)).to.be.equal(3.2e-30);
  });
  it(`0.1 + 0.2 + 0.3 = 0.6`, () => {
    expect(plus(0.1, 0.2, 0.3)).to.be.equal(0.6);
  });
  it(`0.1 + 0.2 + 0.3 + 0.4 = 1`, () => {
    expect(plus(0.1, 0.2, 0.3, 0.4)).to.be.equal(1);
  });
  it(`0.1 + 0.2 + 0.3 + 0.4 + 0.5 = 1.5`, () => {
    expect(plus(0.1, 0.2, 0.3, 0.4, 0.5)).to.be.equal(1.5);
  });
})