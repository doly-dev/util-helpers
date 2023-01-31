import { isEmail } from '../../src';

describe('isEmail', () => {
  it('非字符串', () => {
    expect(isEmail(true)).toBe(false);
    expect(isEmail(123)).toBe(false);
  });
  it('"1232@qq.com" => true', () => {
    expect(isEmail('1232@qq.com')).toBe(true);
  });
  it('"123@" => false', () => {
    expect(isEmail('123@')).toBe(false);
  });
});
