/**
 * @jest-environment jsdom
 */
import isBlob from '../../src/utils/type/isBlob';

describe('isBlob', () => {
  it('incorrect', () => {
    // @ts-ignore
    expect(isBlob()).toBe(false);
    expect(isBlob(undefined)).toBe(false);
    expect(isBlob(null)).toBe(false);
    expect(isBlob(true)).toBe(false);
    expect(isBlob(false)).toBe(false);
    expect(isBlob('')).toBe(false);
    expect(isBlob('a')).toBe(false);
    expect(isBlob(1)).toBe(false);
    expect(isBlob([1])).toBe(false);
    expect(isBlob(['a'])).toBe(false);
    expect(isBlob({})).toBe(false);
    expect(isBlob(Symbol(''))).toBe(false);
    expect(isBlob(new ArrayBuffer(8))).toBe(false);
    expect(isBlob(new Date())).toBe(false);
    expect(isBlob(new Error())).toBe(false);
    expect(isBlob(/x/)).toBe(false);
  });
  it('correct', () => {
    expect(isBlob(new Blob())).toBe(true);
    expect(isBlob(new Blob(['1']))).toBe(true);
    expect(isBlob(new Blob(['<a>html</a>'], { type: 'html/plain' }))).toBe(true);
    expect(isBlob(new Blob([new ArrayBuffer(8)]))).toBe(true);
  });
});
