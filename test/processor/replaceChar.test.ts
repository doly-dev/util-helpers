import { replaceChar } from '../../src';

describe('replaceChar', () => {
  it('手机号显示前三后四', () => {
    expect(replaceChar('13000000000')).toBe('130****0000');
  });

  it(`身份证号显示前三后四`, () => {
    expect(replaceChar('130701199310302288')).toBe('130***********2288');
  });

  it(`邮箱显示前两位和@后面内容，替换字符固定4位`, () => {
    const email = '12345@qq.com';
    expect(replaceChar(email, { start: 2, end: email.indexOf('@'), repeat: 4 })).toBe('12****@qq.com');
  });

  it(`邮箱显示前两位和@后面内容，替换字符改为"."，固定4位`, () => {
    const email = '12345@qq.com';
    expect(replaceChar(email, { start: 2, end: email.indexOf('@'), char: '.', repeat: 4 })).toBe('12....@qq.com');
  });

  it(`银行卡号显示后四位，替换字符固定4位`, () => {
    expect(replaceChar('6228480402564890018', { start: 0, end: -4, repeat: 4 })).toBe('****0018');
  });

  it(`带格式的银行卡号显示前四后四，排除空格`, () => {
    expect(replaceChar('6228 4804 0256 4890 018', { start: 4, end: -4, exclude: ' ' })).toBe('6228 **** **** **** 018');
  });

  it(`用户名`, () => {
    expect(replaceChar('林某', { start: 1, end: Infinity, repeat: 2 })).toBe('林**');
    expect(replaceChar('林某某', { start: 1, end: Infinity, repeat: 2 })).toBe('林**');
    expect(replaceChar('林某某某', { start: 1, end: Infinity, repeat: 2 })).toBe('林**');
    expect(replaceChar('林某某', { start: 1, end: 111 })).toBe('林**');

    expect(replaceChar('林某', { start: 1, end: -1, repeat: 1 })).toBe('林某');
    expect(replaceChar('林某某', { start: 1, end: -1, repeat: 1 })).toBe('林*某');
    expect(replaceChar('林某某某', { start: 1, end: -1, repeat: 1 })).toBe('林*某');
  });

  it(`incorrect`, () => {
    // start 过大
    expect(replaceChar('林某某', { start: 111, end: 2 })).toBe('林某某');
    // start 比 end 大
    expect(replaceChar('林某某', { start: 2, end: 1 })).toBe('林某某');
    expect(replaceChar('林某某', { start: -1, end: 1 })).toBe('林某某');


    // 非法值
    // @ts-ignore
    expect(replaceChar()).toBe('');
    // @ts-ignore
    expect(replaceChar(null)).toBe('');
    // @ts-ignore
    expect(replaceChar(true)).toBe('true');
    // @ts-ignore
    expect(replaceChar(false)).toBe('false');
  });
});
