import { sleep } from 'ut2';
import { AsyncMemo } from '../src';

describe('AsyncMemo', () => {
  function mock() {
    let counter = 0;
    const asyncFn = jest.fn(async () => {
      await sleep();
      return ++counter;
    });
    return { counter, asyncFn };
  }

  it('基础用法', async () => {
    const { asyncFn } = mock();
    const asyncMemo = new AsyncMemo();

    const result1 = await asyncMemo.run(asyncFn, 'a');
    expect(result1).toBe(1);

    const result2 = await asyncMemo.run(asyncFn, 'a');
    expect(result2).toBe(1);

    const result3 = await asyncMemo.run(asyncFn);
    expect(result3).toBe(2);

    const result4 = await asyncMemo.run(asyncFn);
    expect(result4).toBe(3);
  });

  it('内部缓存Promise，不重复执行异步方法', async () => {
    const { asyncFn } = mock();
    const asyncMemo = new AsyncMemo({ prefix: 'test2' });

    expect(asyncMemo.run(asyncFn, 'a')).resolves.toBe(1);
    expect(asyncMemo.run(asyncFn, 'a')).resolves.toBe(1);
    expect(asyncMemo.run(asyncFn, 'a')).resolves.toBe(1);

    expect(asyncFn).toHaveBeenCalledTimes(1);
  });

  it('如果存在缓存，读取缓存数据，不再执行异步方法', async () => {
    const { asyncFn } = mock();
    const asyncMemo = new AsyncMemo({ prefix: 'test3' });

    const result1 = await asyncMemo.run(asyncFn, 'a');
    expect(result1).toBe(1);
    expect(asyncFn).toHaveBeenCalledTimes(1);
    expect(asyncMemo.cache.keys()).toEqual(['a']);

    const result2 = await asyncMemo.run(asyncFn, 'a');
    expect(result2).toBe(1);
    expect(asyncFn).toHaveBeenCalledTimes(1);
  });

  it('不读取缓存数据', async () => {
    const { asyncFn } = mock();
    const asyncMemo = new AsyncMemo({ prefix: 'test4' });

    const result1 = await asyncMemo.run(asyncFn, 'a', { persisted: false });
    expect(result1).toBe(1);
    expect(asyncFn).toHaveBeenCalledTimes(1);
    expect(asyncMemo.cache.keys()).toEqual(['a']);

    const result2 = await asyncMemo.run(asyncFn, 'a', { persisted: false });
    expect(result2).toBe(2);
    expect(asyncFn).toHaveBeenCalledTimes(2);
    expect(asyncMemo.cache.keys()).toEqual(['a']);
  });

  it('不传缓存键，直接执行异步方法', () => {
    const { asyncFn } = mock();
    const asyncMemo = new AsyncMemo({ prefix: 'test5' });

    expect(asyncMemo.run(asyncFn)).resolves.toBe(1);
    expect(asyncMemo.cache.keys()).toEqual([]);
  });

  it('异步方法异常', async () => {
    const errorFn = async () => {
      await sleep();
      return Promise.reject('some error');
    };
    const cb = jest.fn();
    const asyncMemo = new AsyncMemo({ prefix: 'test6' });

    await asyncMemo.run(errorFn, 'a').catch(cb);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenLastCalledWith('some error');
  });
});
