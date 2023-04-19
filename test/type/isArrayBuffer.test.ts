import isArrayBuffer from '../../src/utils/type/isArrayBuffer';

describe('isArrayBuffer', () => {
  it('incorrect', () => {
    // @ts-ignore
    expect(isArrayBuffer()).toBe(false);
    expect(isArrayBuffer(undefined)).toBe(false);
    expect(isArrayBuffer(null)).toBe(false);
    expect(isArrayBuffer(true)).toBe(false);
    expect(isArrayBuffer(false)).toBe(false);
    expect(isArrayBuffer('')).toBe(false);
    expect(isArrayBuffer('a')).toBe(false);
    expect(isArrayBuffer(1)).toBe(false);
    expect(isArrayBuffer([1])).toBe(false);
    expect(isArrayBuffer(['a'])).toBe(false);
    expect(isArrayBuffer({})).toBe(false);
    expect(isArrayBuffer(Symbol(''))).toBe(false);
    expect(isArrayBuffer(new Date())).toBe(false);
    expect(isArrayBuffer(new Error())).toBe(false);
    expect(isArrayBuffer(/x/)).toBe(false);
  });
  it('correct', () => {
    expect(isArrayBuffer(new ArrayBuffer(8))).toBe(true);
  });
});
