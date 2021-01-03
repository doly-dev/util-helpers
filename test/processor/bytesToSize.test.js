import {
  expect
} from 'chai';

import bytesToSize from '../../src/bytesToSize';

describe('bytesToSize', () => {
  it(`0 => "0 B"`, () => {
    expect(bytesToSize(0)).to.be.equal('0 B');
  });
  it(`1024 => "1 KB"`, () => {
    expect(bytesToSize(1024)).to.be.equal('1 KB');
  });
  it(`1025 => 1 KB`, () => {
    expect(bytesToSize(1025)).to.be.equal('1 KB');
  });
  it(`1425 => 1.39 KB`, () => {
    expect(bytesToSize(1425)).to.be.equal('1.39 KB');
  });
  it(`1024 * 1024 => 1 MB`, () => {
    expect(bytesToSize(1024 * 1024)).to.be.equal('1 MB');
  });
  it(`10 * 1024 * 1024 => 10 MB`, () => {
    expect(bytesToSize(10 * 1024 * 1024)).to.be.equal('10 MB');
  });
  it(`1024*1024*1024 => 1 GB`, () => {
    expect(bytesToSize(1024 * 1024 * 1024)).to.be.equal('1 GB');
  });
  it(`10 * 1024*1024*1024 => 10 GB`, () => {
    expect(bytesToSize(10 * 1024 * 1024 * 1024)).to.be.equal('10 GB');
  });
  it(`1425000000909 => 1.3 TB`, () => {
    expect(bytesToSize(1425000000909)).to.be.equal('1.3 TB');
  });
})