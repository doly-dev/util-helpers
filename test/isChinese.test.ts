import { isChinese } from '../src';

// 部分测试依赖的环境可能导致结果不同，可通过设置 useExtend 规避
// eslint-disable-next-line no-prototype-builtins
// const supportRegExpUnicode = RegExp.prototype.hasOwnProperty('unicode');

describe('isChinese', () => {
  it('incorrect', () => {
    expect(isChinese(true)).toBe(false);
    expect(isChinese(123)).toBe(false);
    expect(isChinese('林A')).toBe(false);
    expect(isChinese('𠮷')).toBe(false);
  });

  it('correct', () => {
    expect(isChinese('林某某')).toBe(true);
    expect(isChinese('林')).toBe(true);
  });

  it('loose', () => {
    expect(isChinese('林A', { loose: true })).toBe(true);
    expect(isChinese('A林A', { loose: true })).toBe(true);
  });

  it('基础汉字补充', () => {
    expect(isChinese('𠮷', { useExtend: true })).toBe(true);
    expect(isChinese('龦龧龨龩龪龫龬龭龮龯', { useExtend: true })).toBe(true);
    expect(isChinese('龦龧龨龩龪龫龬龭龮龯C', { useExtend: true, loose: true })).toBe(true);

    // 基本汉字扩展A
    expect(isChinese('㑹㑺㑻㑼㑽㑾㑿㒀㒁㒂㒃㒄㒅㒆㒇㒈㒉㒊㒋㒌', { useExtend: true })).toBe(true);
    expect(isChinese('㑹㑺㑻㑼㑽㑾㑿㒀㒁㒂㒃㒄㒅㒆㒇㒈㒉㒊㒋㒌2', { useExtend: true, loose: true })).toBe(true);

    // 基本汉字扩展B
    expect(isChinese('𠦹𠦺𠦻', { useExtend: true })).toBe(true);
    expect(isChinese('𠦹𠦺𠦻3', { useExtend: true, loose: true })).toBe(true);

    // 基本汉字扩展C
    expect(isChinese('𪣻𪧦𪨰', { useExtend: true })).toBe(true);
    expect(isChinese('𪣻𪧦𪨰C', { useExtend: true, loose: true })).toBe(true);

    // 基本汉字扩展D
    expect(isChinese('𫝶𫝷𫝼𫞂𫞯𫞩', { useExtend: true })).toBe(true);
    expect(isChinese('𫝶𫝷𫝼𫞂𫞯𫞩C', { useExtend: true, loose: true })).toBe(true);

    // 基本汉字扩展E
    expect(isChinese('𫾔𫾻𫶇𫸩𫵷', { useExtend: true })).toBe(true);
    expect(isChinese('𫾔𫾻𫶇𫸩𫵷C', { useExtend: true, loose: true })).toBe(true);
  });

  it('不使用基础汉字补充', () => {
    expect(isChinese('龦龧龨龩龪龫龬龭龮龯')).toBe(false);
    expect(isChinese('龦龧龨龩龪龫龬龭龮龯C', { loose: true })).toBe(false);

    // 基本汉字扩展A
    expect(isChinese('㑹㑺㑻㑼㑽㑾㑿㒀㒁㒂㒃㒄㒅㒆㒇㒈㒉㒊㒋㒌')).toBe(false);
    expect(isChinese('㑹㑺㑻㑼㑽㑾㑿㒀㒁㒂㒃㒄㒅㒆㒇㒈㒉㒊㒋㒌2', { loose: true })).toBe(false);

    // 基本汉字扩展B
    expect(isChinese('𠦹𠦺𠦻')).toBe(false);
    expect(isChinese('𠦹𠦺𠦻3', { loose: true })).toBe(false);

    // 基本汉字扩展C
    expect(isChinese('𪣻𪧦𪨰')).toBe(false);
    expect(isChinese('𪣻𪧦𪨰C', { loose: true })).toBe(false);

    // 基本汉字扩展D
    expect(isChinese('𫝶𫝷𫝼𫞂𫞯𫞩')).toBe(false);
    expect(isChinese('𫝶𫝷𫝼𫞂𫞯𫞩C', { loose: true })).toBe(false);

    // 基本汉字扩展E
    expect(isChinese('𫾔𫾻𫶇𫸩𫵷')).toBe(false);
    expect(isChinese('𫾔𫾻𫶇𫸩𫵷C', { loose: true })).toBe(false);
  });

  it('繁体字', () => {
    expect(isChinese('發財', { useExtend: true })).toBe(true);
    expect(isChinese('熲', { useExtend: true })).toBe(true);
    expect(isChinese('贇', { useExtend: true })).toBe(true);
    expect(isChinese('钂', { useExtend: true })).toBe(true);
    expect(isChinese('錡', { useExtend: true })).toBe(true);
    expect(isChinese('蘇', { useExtend: true })).toBe(true);
    expect(isChinese('車', { useExtend: true })).toBe(true);
    expect(isChinese('賈', { useExtend: true })).toBe(true);
    expect(isChinese('龜', { useExtend: true })).toBe(true);
    expect(isChinese('懶', { useExtend: true })).toBe(true);
    expect(isChinese('癩', { useExtend: true })).toBe(true);
    expect(isChinese('羅', { useExtend: true })).toBe(true);
  });
});
