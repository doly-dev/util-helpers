import { replaceChar } from '../../src';

describe('replaceChar', () => {
  it('general', () => {
    // 手机号码 前3后4
    expect(replaceChar('13000000000')).toBe('130****0000');
    // 身份证号 前6后4
    expect(replaceChar('130701199310302288', { start: 6, end: -4 })).toBe('130701********2288');
    // 邮箱 @前两位和@后缀
    const email = '12345@qq.com';
    const emailAtIndex = email.indexOf('@');
    expect(replaceChar(email, { start: emailAtIndex - 2, end: emailAtIndex })).toBe('123**@qq.com');

    // 邮箱 前2和@后面的内容，替换字符固定4位
    expect(replaceChar(email, { start: 2, end: email.indexOf('@'), repeat: 4 })).toBe('12****@qq.com');
    // 邮箱显示前两位和@后面内容，替换字符改为"."，固定4位
    expect(replaceChar(email, { start: 2, end: email.indexOf('@'), char: '.', repeat: 4 })).toBe('12....@qq.com');

    // 银行卡号 银行卡号显示后4位，替换字符固定4位
    expect(replaceChar('6228480402564890018', { start: 0, end: -4, repeat: 4 })).toBe('****0018');
    // 银行卡号 前6后4
    expect(replaceChar('6228480402564890018', { start: 6, end: -4 })).toBe('622848*********0018');
    // 银行卡号 前6后4 忽略空格
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
