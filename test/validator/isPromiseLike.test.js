import {
  expect
} from 'chai';

import isPromiseLike from '../../src/isPromiseLike'

const fn = ()=>{};
fn.then=()=>{};

describe('isPromiseLike', () => {
  it('null => false', () => {
    expect(isPromiseLike(null)).to.be.equal(false);
  });
  it('undefined => false', () => {
    expect(isPromiseLike(undefined)).to.be.equal(false);
  });
  it('0 => false', () => {
    expect(isPromiseLike(0)).to.be.equal(false);
  });
  it('-42 => false', () => {
    expect(isPromiseLike(-42)).to.be.equal(false);
  });
  it('42 => false', () => {
    expect(isPromiseLike(42)).to.be.equal(false);
  });
  it('"" => false', () => {
    expect(isPromiseLike('')).to.be.equal(false);
  });
  it('"then" => false', () => {
    expect(isPromiseLike("then")).to.be.equal(false);
  });
  it('false => false', () => {
    expect(isPromiseLike(false)).to.be.equal(false);
  });
  it('true => false', () => {
    expect(isPromiseLike(true)).to.be.equal(false);
  });
  it('{} => false', () => {
    expect(isPromiseLike({})).to.be.equal(false);
  });
  it('{then: true} => false', () => {
    expect(isPromiseLike({then: true})).to.be.equal(false);
  });
  it('[] => false', () => {
    expect(isPromiseLike([])).to.be.equal(false);
  });
  it('[true] => false', () => {
    expect(isPromiseLike([true])).to.be.equal(false);
  });
  it('() => {} => false', () => {
    expect(isPromiseLike(() => {})).to.be.equal(false);
  });
  it('{then: function () {}} => true', () => {
    expect(isPromiseLike({then: function () {}})).to.be.equal(true);
  });
  it('fn => true', () => {
    expect(isPromiseLike(fn)).to.be.equal(true);
  });
  it('new Promise(resolve=>resolve()) => true', () => {
    expect(isPromiseLike(new Promise(resolve=>resolve()))).to.be.equal(true);
  });
  it('Promise.resolve() => true', () => {
    expect(isPromiseLike(Promise.resolve())).to.be.equal(true);
  });
})