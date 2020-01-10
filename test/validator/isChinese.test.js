import {
  expect
} from 'chai';

import isChinese from '../../src/isChinese'

describe('isChinese', () => {
  it('非字符串 => false', () => {
    expect(isChinese(true)).to.be.equal(false);
    expect(isChinese(123)).to.be.equal(false);
  });
  it('"林某某" => true', () => {
    expect(isChinese('林某某')).to.be.equal(true);
  });
  it('"林A" => false', () => {
    expect(isChinese('林A')).to.be.equal(false);
  });
  it('宽松模式，"林A" => true', () => {
    expect(isChinese('林A', { loose: true })).to.be.equal(true);
  });
  it('宽松模式，"A林A" => true', () => {
    expect(isChinese('A林A', { loose: true })).to.be.equal(true);
  });
  it('"基本汉字补充: "龦龧龨龩龪龫龬龭龮龯" => true', () => {
    expect(isChinese('龦龧龨龩龪龫龬龭龮龯')).to.be.equal(true);
  });
  it('宽松模式，基本汉字补充: "龦龧龨龩龪龫龬龭龮龯C" => true', () => {
    expect(isChinese('龦龧龨龩龪龫龬龭龮龯C', { loose: true })).to.be.equal(true);
  });
  it('"基本汉字扩展A: "㑹㑺㑻㑼㑽㑾㑿㒀㒁㒂㒃㒄㒅㒆㒇㒈㒉㒊㒋㒌" => true', () => {
    expect(isChinese('㑹㑺㑻㑼㑽㑾㑿㒀㒁㒂㒃㒄㒅㒆㒇㒈㒉㒊㒋㒌')).to.be.equal(true);
  });
  it('宽松模式，基本汉字扩展A: "㑹㑺㑻㑼㑽㑾㑿㒀㒁㒂㒃㒄㒅㒆㒇㒈㒉㒊㒋㒌2" => true', () => {
    expect(isChinese('㑹㑺㑻㑼㑽㑾㑿㒀㒁㒂㒃㒄㒅㒆㒇㒈㒉㒊㒋㒌2', { loose: true })).to.be.equal(true);
  });
  it('"基本汉字扩展B: "𠦹𠦺𠦻" => true', () => {
    expect(isChinese('𠦹𠦺𠦻')).to.be.equal(true);
  });
  it('宽松模式，基本汉字扩展B: "𠦹𠦺𠦻3" => true', () => {
    expect(isChinese('𠦹𠦺𠦻3', { loose: true })).to.be.equal(true);
  });
  it('"基本汉字扩展C: "𪣻𪧦𪨰" => true', () => {
    expect(isChinese('𠦹𠦺𠦻')).to.be.equal(true);
  });
  it('宽松模式，基本汉字扩展C: "𪣻𪧦𪨰C" => true', () => {
    expect(isChinese('𪣻𪧦𪨰C', { loose: true })).to.be.equal(true);
  });
  it('"基本汉字扩展D: "𫝶𫝷𫝼𫞂𫞯𫞩" => true', () => {
    expect(isChinese('𫝶𫝷𫝼𫞂𫞯𫞩')).to.be.equal(true);
  });
  it('宽松模式，基本汉字扩展D: "𫝶𫝷𫝼𫞂𫞯𫞩D" => true', () => {
    expect(isChinese('𫝶𫝷𫝼𫞂𫞯𫞩D', { loose: true })).to.be.equal(true);
  });
  it('"基本汉字扩展E: "𫾔𫾻𫶇𫸩𫵷" => true', () => {
    expect(isChinese('𫾔𫾻𫶇𫸩𫵷')).to.be.equal(true);
  });
  it('宽松模式，基本汉字扩展E: "𫾔𫾻𫶇𫸩𫵷E" => true', () => {
    expect(isChinese('𫾔𫾻𫶇𫸩𫵷E', { loose: true })).to.be.equal(true);
  });
});