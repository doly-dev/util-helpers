import { checkResult } from '../src';

// 测试用例
describe('checkResult', () => {
  // 正面测试用例
  test('should return true', async () => {
    expect(await checkResult(() => true)).toBe(true);
    expect(await checkResult(() => Promise.resolve())).toBe(true);
    expect(await checkResult(() => Promise.resolve(true))).toBe(true);
    expect(await checkResult(async () => true)).toBe(true);
    expect(await checkResult(() => null)).toBe(true);
    expect(await checkResult(() => undefined)).toBe(true);
    expect(await checkResult(() => 'foo')).toBe(true);
    expect(await checkResult(() => Promise.resolve(1))).toBe(true);
  });

  test('should return false', async () => {
    expect(await checkResult(() => false)).toBe(false);
    expect(await checkResult(() => Promise.resolve(false))).toBe(false);
    expect(await checkResult(() => Promise.reject())).toBe(false);
    expect(await checkResult(async () => false)).toBe(false);
    expect(
      await checkResult(() => {
        throw new Error('error');
      })
    ).toBe(false);
    expect(await checkResult(() => Promise.reject(new Error('error')))).toBe(false);
  });

  // 边界测试用例
  test('should handle no arguments', async () => {
    // @ts-ignore
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
  test('other type arguments', async () => {
    const foo = (a: number, b: string) => '' + a + b;
    expect(await checkResult(foo, 1, 'a')).toBe(true);

    expect(await checkResult(undefined)).toBe(true);
    expect(await checkResult(null)).toBe(true);
    expect(await checkResult(1)).toBe(true);
    expect(await checkResult(false)).toBe(false);
    expect(await checkResult(Promise.reject())).toBe(false);
    expect(await checkResult(Promise.resolve())).toBe(true);
    expect(await checkResult(Promise.resolve(false))).toBe(false);
  });
});
