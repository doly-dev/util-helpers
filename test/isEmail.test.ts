import { isEmail } from '../src';

describe('isEmail', () => {
  it('非字符串', () => {
    expect(isEmail(true)).toBe(false);
    expect(isEmail(123)).toBe(false);
  });
  it('正确的邮箱', () => {
    expect(isEmail('123@qq.com')).toBe(true);
    expect(isEmail('12_3@qq.com')).toBe(true);
    expect(isEmail('1-23@qq.com')).toBe(true);
  });
  it('错误的邮箱', () => {
    expect(isEmail('123@')).toBe(false);
    expect(isEmail('1 23@qq.com')).toBe(false);
    expect(isEmail('1&23@qq.com')).toBe(false);
    expect(isEmail('1%23@qq.com')).toBe(false);
  });
});
