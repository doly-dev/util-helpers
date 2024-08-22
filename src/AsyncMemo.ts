import { Cache, CacheOptions } from 'cache2';
import { isString, uniqueId } from 'ut2';

/**
 * 异步缓存
 *
 * 特点：
 * 1. 共享异步。同一个缓存键的异步，最多同时运行一个异步，异步结果共享。
 * 2. 持久化数据。存在缓存结果，不再执行异步方法，直接返回该结果。
 * 3. 每个实例都有独立的缓存空间。相互之间隔离，缓存灵活配置，更多配置请查阅 [`cache2`](https://www.npmjs.com/package/cache2)。
 *
 * @class
 * @see {@link https://www.npmjs.com/package/cache2 cache2}
 * @param {Object} [options] 缓存配置项，更多配置项可参考 [`cache2`](https://www.npmjs.com/package/cache2)
 * @param {number} [options.max] 最大缓存数量
 * @param {'replaced' | 'limited'} [options.maxStrategy] 缓存策略
 * @example
 *
 * const asyncMemo = new AsyncMemo({ max: 20, maxStrategy: 'replaced' });
 * asyncMemo.run(()=>download({ fssid: 'a' }), 'a');
 * asyncMemo.run(()=>download({ fssid: 'b' }), 'b');
 * asyncMemo.run(()=>download({ fssid: 'a' }), 'a'); // 如果有缓存结果直接返回，如果有异步执行中，不会重复触发异步，但共享异步结果。
 *
 * asyncMemo.run(()=>download({ fssid: 'a' }), 'a', { persisted: false }); // 不读取缓存结果，但是异步执行结果还是会缓存。
 * asyncMemo.run(()=>download({ fssid: 'a' })); // 没有缓存键时，直接执行异步方法，不读取缓存结果，也不会缓存异步结果。
 */
class AsyncMemo<DataType = any> {
  private promiseCache: Record<string, Promise<any>>;
  /**
   * cache2 实例，用于管理缓存
   */
  cache: Cache<DataType>;

  constructor(options?: Partial<CacheOptions>) {
    this.promiseCache = {};
    this.cache = new Cache(uniqueId('uh_async_memo'), options);
  }

  /**
   * 执行异步方法
   *
   * @param {Function} asyncFn 异步方法
   * @param {string} [key] 缓存键，如果没有该值将直接执行异步方法。
   * @param {Object} [options] 配置项
   * @param {number} [options.ttl] 数据存活时间
   * @param {boolean} [options.persisted=true] 数据持久化，默认`true`。如果存在缓存数据，直接返回缓存数据，不再执行异步方法。<br/>即使不开启该配置，不影响在异步执行成功后缓存数据。
   * @returns {Promise<*>} 异步结果
   */
  run(
    asyncFn: (...args: any[]) => Promise<DataType>,
    key?: string,
    options?: {
      ttl?: number;
      persisted?: boolean;
    }
  ): Promise<DataType> {
    if (!key || !isString(key)) {
      return asyncFn();
    }

    const opts = {
      persisted: true,
      ...options
    };

    if (opts.persisted) {
      const data = this.cache.get(key);
      if (data) {
        return Promise.resolve(data);
      }
    }

    if (!this.promiseCache[key]) {
      this.promiseCache[key] = asyncFn()
        .then((res) => {
          delete this.promiseCache[key];
          this.cache.set(key, res, opts.ttl);
          return res;
        })
        .catch((err) => {
          delete this.promiseCache[key];
          return Promise.reject(err);
        });
    }
    return this.promiseCache[key] as Promise<DataType>;
  }
}

export default AsyncMemo;
