import { times } from 'ut2';
import Cache from '../../src/utils/Cache';

describe('Cache', () => {
  it('basic', () => {
    const cache = new Cache();

    expect(cache.get('a')).toBeUndefined();
    expect(cache.has('a')).toBe(false);
    expect(cache.set('a', 1)).toBeUndefined();

    expect(cache.get('a')).toBe(1);
    expect(cache.has('a')).toBe(true);
  });

  it('键值支持任意类型', () => {
    const cache = new Cache();
    const obj = {};
    const arr = [1];
    const nul = null;
    const undef = undefined;
    const map = new Map();
    const set = new Set();
    const str = 'abc';
    const num = 123;
    const sym = Symbol.for('a');

    cache.set(nul, undef);
    expect(cache.get(nul)).toBeUndefined();
    expect(cache.has(nul)).toBe(true);

    cache.set(map, obj);
    expect(cache.get(map)).toEqual(obj);
    expect(cache.has(map)).toBe(true);

    cache.set(set, arr);
    expect(cache.get(set)).toEqual(arr);
    expect(cache.has(set)).toBe(true);

    cache.set(obj, arr);
    expect(cache.get(obj)).toEqual(arr);
    expect(cache.has(obj)).toBe(true);

    cache.set(str, num);
    expect(cache.get(str)).toEqual(num);
    expect(cache.has(str)).toBe(true);

    cache.set(num, nul);
    expect(cache.get(num)).toEqual(nul);
    expect(cache.has(num)).toBe(true);

    cache.set(sym, map);
    expect(cache.get(sym)).toEqual(map);
    expect(cache.has(sym)).toBe(true);
  });

  it('超出最大长度限制', () => {
    const fn = jest.fn();
    const cache = new Cache({ max: 5 });
    cache.on('del', fn);

    times(10).forEach((item) => {
      cache.set(item, item);
    });

    expect(fn).toHaveBeenCalledTimes(5);
    expect(fn).toHaveBeenCalledWith(0, 0);
    expect(fn).toHaveBeenCalledWith(1, 1);
    expect(fn).toHaveBeenCalledWith(2, 2);
    expect(fn).toHaveBeenCalledWith(3, 3);
    expect(fn).toHaveBeenCalledWith(4, 4);
  });

  it('不限制长度', () => {
    const fn = jest.fn();
    const cache = new Cache({ max: 0 });
    cache.on('del', fn);

    times(10).forEach((item) => {
      cache.set(item, item);
    });

    expect(fn).toHaveBeenCalledTimes(0);
  });

  it('相同键值会覆盖已有缓存值', () => {
    const cache = new Cache();
    cache.set('a', 1);
    expect(cache.get('a')).toBe(1);
    cache.set('a', 2);
    expect(cache.get('a')).toBe(2);
  });
});
