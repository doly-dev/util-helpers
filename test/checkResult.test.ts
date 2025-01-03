import { checkResult } from '../src';

// 测试用例
describe('checkResult', () => {
  // 正面测试用例
  test('should return true when function returns true', async () => {
    const result = await checkResult(() => true);
    expect(result).toBe(true);
  });

  test('should return true when function returns a resolved promise with true', async () => {
    const result = await checkResult(() => Promise.resolve(true));
    expect(result).toBe(true);
  });

  test('should return true when function returns a resolved promise with non-false value', async () => {
    const result = await checkResult(() => Promise.resolve(1));
    expect(result).toBe(true);
  });

  test('should return false when function returns false', async () => {
    const result = await checkResult(() => false);
    expect(result).toBe(false);
  });

  test('should return false when function returns a resolved promise with false', async () => {
    const result = await checkResult(() => Promise.resolve(false));
    expect(result).toBe(false);
  });

  // 负面测试用例
  test('should return false when function throws an error', async () => {
    const result = await checkResult(() => {
      throw new Error('error');
    });
    expect(result).toBe(false);
  });

  test('should return false when function returns a rejected promise', async () => {
    const result = await checkResult(() => Promise.reject(new Error('error')));
    expect(result).toBe(false);
  });

  // 边界测试用例
  test('should handle no arguments', async () => {
    const result = await checkResult();
    expect(result).toBe(true);
  });

  test('should handle dynamic arguments', async () => {
    const fn = (...args: any[]) => args.length > 1;
    const result = await checkResult(fn);
    expect(result).toBe(false);

    const result2 = await checkResult(fn, 1, 2);
    expect(result2).toBe(true);
  });

  test('should handle undefined return', async () => {
    const result = await checkResult(() => undefined);
    expect(result).toBe(true);
  });

  // 性能测试用例
  test('should handle a large number of arguments', async () => {
    const result = await checkResult((...args) => args.length > 0, ...Array(1000).fill(1));
    expect(result).toBe(true);
  });

  // 类型测试用例
  test('type check', async () => {
    const foo = (a: number, b: string) => '' + a + b;
    const result = await checkResult(foo, 1, 'a');
    expect(result).toBe(true);
  });
});
