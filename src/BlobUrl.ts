import { findKey } from 'ut2';
import { createObjectURL, revokeObjectURL } from './utils/native';

/**
 * Blob 对象 URL 记录。
 *
 * 便于管理项目中上传文件通过 `URL.createObjectURL` 生成的对象URL。
 *
 * 特点：
 * 1. 避免重复创建，相同的 `Blob` 对象只会生成一个 URL 字符串
 * 2. 当清除缓存时，自动释放内存
 *
 * @class
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL_static | URL：createObjectURL()}
 * @example
 * const blobUrl = new BlobUrl();
 *
 */
class BlobUrl {
  protected cache: Map<Blob, string>;

  constructor() {
    this.cache = new Map<Blob, string>();
  }

  /**
   * 同 `URL.createObjectURL` 方法，创建一个对象 URL 字符串。
   *
   * 生成时内部会记录一个缓存，相同的 `Blob` 对象最多只会产生一个 URL 字符串。
   *
   * @param {Blob} obj 用于创建 URL 的 File、Blob 对象。
   * @returns 一个包含对象 URL 的字符串，可用于引用指定源 object 的内容。
   */
  createObjectURL(obj: Blob) {
    if (this.cache.has(obj)) {
      return this.cache.get(obj);
    }
    const url = createObjectURL(obj);
    if (url) {
      this.cache.set(obj, url);
    }
    return url;
  }

  /**
   * 同 `URL.revokeObjectURL` 方法，释放对象 URL 。
   *
   * @param {string} url 通过调用 `createObjectURL()` 方法创建的对象 URL 的字符串。
   */
  revokeObjectURL(url: string) {
    const obj = findKey(this.cache, (v) => v === url);
    if (obj) {
      this.cache.delete(obj);
    }
    revokeObjectURL(url);
  }

  /**
   * 清理缓存。
   *
   * 迭代调用 `URL.revokeObjectURL` 来释放内存。
   */
  clear() {
    this.cache.forEach((v) => {
      revokeObjectURL(v);
    });
    this.cache.clear();
  }
}

export default BlobUrl;
