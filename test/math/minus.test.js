import {
  expect
} from 'chai';

import minus from '../../src/minus';

describe('minus', () => {
  it(`1 - 0.9 = 0.1`, () => {
      expect(minus(1, 0.9)).to.be.equal(0.1);
  });
  it(`1 - 0.9 - 0.02 = 0.08`, () => {
      expect(minus(1, 0.9, 0.02)).to.be.equal(0.08);
  });
  it(`1 - 0.9 - 0.02 - 0.08 = 0`, () => {
      expect(minus(1, 0.9, 0.02, 0.08)).to.be.equal(0);
  });
  it(`0.07 - 0.01 = 0.06`, () => {
      expect(minus(0.07, 0.06)).to.be.equal(0.01);
  });
  it(`0.7 - 0.1 = 0.6`, () => {
      expect(minus(0.7, 0.6)).to.be.equal(0.1);
  });
  it(`1.0 - 0.9 = 0.1`, () => {
      expect(minus(1.0, 0.9)).to.be.equal(0.1);
  });
  it(`1 - 0 = 1`, () => {
      expect(minus(1, 0)).to.be.equal(1);
  });
  it(`1 - (-0) = 1`, () => {
      expect(minus(1, -0)).to.be.equal(1);
  });
  it(`-1 - 0 = -1`, () => {
      expect(minus(-1, 0)).to.be.equal(-1);
  });
  it(`-1 - (-0) = -1`, () => {
      expect(minus(-1, -0)).to.be.equal(-1);
  });
  it(`1 - 22 = -21`, () => {
      expect(minus(1, 22)).to.be.equal(-21);
  });
  it(`8893568.397103781249 - (-7.29674059550) = 8893575.693844376749`, () => {
      expect(minus(8893568.397103781249, -7.29674059550)).to.be.equal(8893575.693844376749);
  });
  it(`105468873 - 0 = 105468873`, () => {
      expect(minus(105468873, 0)).to.be.equal(105468873);
  });
  it(`1.23e5 - 10 = 122990`, () => {
      expect(minus(1.23e5, 10)).to.be.equal(122990);
  });
  it(`1.23e-5 - 1.0023 = -1.0022877`, () => {
      expect(minus(1.23e-5, 1.0023)).to.be.equal(-1.0022877);
  });
  it(`1.3224e10 - 21 = 13223999979`, () => {
      expect(minus(1.3224e10, 21)).to.be.equal(13223999979);
  });
  it(`1.3224e10 - 1.3224e3 = 13223998677.6`, () => {
      expect(minus(1.3224e10, 1.3224e3)).to.be.equal(13223998677.6);
  });
  it(`1.7e-30 - 0.1e-30 = 1.6e-30`, () => {
      expect(minus(1.7e-30, 0.1e-30)).to.be.equal(1.6e-30);
  });
  it(`6 - 3 - 2 = 1`, () => {
      expect(minus(6, 3, 2)).to.be.equal(1);
  });
  it(`6 - 3 - 2 - 1 - 2 - 3 = -5`, () => {
      expect(minus(6, 3, 2, 1, 2, 3)).to.be.equal(-5);
  });
});
