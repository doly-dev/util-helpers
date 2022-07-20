import { isPromiseLike } from '../../src';

const fn = () => {};
fn.then = () => {};

describe('isPromiseLike', () => {
  it('should be defined', () => {
    expect(isPromiseLike).toBeDefined();
  });

  it('incorrect', () => {
    expect(isPromiseLike(null)).toBe(false);
    expect(isPromiseLike(undefined)).toBe(false);
    expect(isPromiseLike(0)).toBe(false);
    expect(isPromiseLike(-42)).toBe(false);
    expect(isPromiseLike(42)).toBe(false);
    expect(isPromiseLike('')).toBe(false);
    expect(isPromiseLike('then')).toBe(false);
    expect(isPromiseLike(false)).toBe(false);
    expect(isPromiseLike(true)).toBe(false);
    expect(isPromiseLike({})).toBe(false);
    expect(isPromiseLike({ then: true })).toBe(false);
    expect(isPromiseLike([])).toBe(false);
    expect(isPromiseLike([true])).toBe(false);
    expect(isPromiseLike(() => {})).toBe(false);
  });

  it('correct', () => {
    expect(isPromiseLike({ then: function () {} })).toBe(true);
    expect(isPromiseLike(fn)).toBe(true);
    expect(isPromiseLike(new Promise((resolve) => resolve()))).toBe(true);
    expect(isPromiseLike(Promise.resolve())).toBe(true);
  });
});
