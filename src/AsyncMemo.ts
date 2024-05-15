import { Cache, CacheOptions } from 'cache2';
import { isString, uniqueId } from 'ut2';

/**
 * 异步缓存
 *
 * @class
 * @see {@link https://www.npmjs.com/package/cache2 | cache2}
 * @param {Object} [options] 缓存配置项，更多配置项可参考 [`cache2`](https://www.npmjs.com/package/cache2)
 * @param {number} [options.max] 最大缓存数量
 * @param {'replaced' | 'limited'} [options.maxStrategy] 缓存策略
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
   * @param {boolean} [options.persisted=true] 数据持久化，如果存在缓存数据，直接返回缓存数据，不再执行异步方法。<br/>即使不开启该配置，不影响在异步执行成功后缓存数据。
   * @returns {Promise<*>} 异步结果
   */
  run(
    asyncFn: (...args: any[]) => Promise<DataType>,
    key?: string,
    options?: {
      ttl?: number;
      persisted?: boolean;
    }
  ) {
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
