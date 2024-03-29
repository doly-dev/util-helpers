import { round } from 'ut2';
import divide from './divide';
import gcd from './gcd';
import loadImageWithBlob from './loadImageWithBlob';
import bytesToSize from './bytesToSize';
import Cache from './utils/Cache';
import { revokeObjectURL } from './utils/native';

type Result = {
  width: number;
  height: number;
  contrast: string;
  measure: string;
  size: string;
  bytes: number;
  image: HTMLImageElement;
  blob: Blob;
};

const cache = new Cache<{ data: Result; r: boolean }, string | Blob>({ max: 1 });
cache.on('del', (v) => {
  if (v.r) {
    try {
      revokeObjectURL(v.data.image.src);
    } catch {
      /* empty */
    }
  }
});

/**
 * 计算宽高比
 *
 * @private
 * @param {number} w 宽度
 * @param {number} h 高度
 * @returns {string} 宽高比
 */
function calcContrast(w: number, h: number) {
  const n = gcd(w, h);
  return `${divide(round(w), n)}:${divide(round(h), n)}`;
}

/**
 * @typedef {Object} ImageInfo 图片信息
 * @property {number} width 宽度
 * @property {number} height 高度
 * @property {string} contrast 宽高比
 * @property {string} measure 尺寸
 * @property {string} size 大小
 * @property {number} bytes 大小，单位字节
 * @property {HTMLImageElement} image HTML图片元素
 * @property {Blob} blob 图片 Blob 对象
 */

/**
 * 获取图片信息。
 *
 * <em style="font-weight: bold;">注意：该方法仅适用于浏览器端。</em>
 *
 * @static
 * @alias module:Other.getImageInfo
 * @since 4.20.0
 * @param {string | Blob} img 图片地址或 blob 对象
 * @param {boolean | CacheOptions} [cacheOptions=true] 是否使用缓存。开启后，自动缓存最近上一次成功的结果，当图片地址或 blob 对象一致时，直接返回该缓存。避免连续请求同一个图片资源，重复加载。当缓存下一次成功加载的图片时，会自动释放上一次缓存的图片，也可以通过 `autoRevokeOnDel` 设置不释放缓存。
 * @param {AjaxOptions} [ajaxOptions] ajax 请求配置项，当传入的图片为字符串时才会触发请求。
 * @returns {Promise<ImageInfo>} 图片信息
 * @example
 *
 * getImageInfo(file).then(imageInfo=>{
 *    // do something
 * });
 *
 * getImageInfo('https://dummyimage.com/200x300').then(imageInfo=>{
 *   // do something
 * });
 *
 * getImageInfo('data:image/png;base64,PGEgaWQ9ImEiPjxiIGlkPSJiIj5oZXkhPC9iPjwvYT4=').then(imageInfo=>{
 *   // do something
 * });
 *
 */
function getImageInfo(img: string | Blob, cacheOptions: boolean | Parameters<typeof loadImageWithBlob>[1] = true, ajaxOptions?: Parameters<typeof loadImageWithBlob>[2]) {
  const _cacheOptions = {
    useCache: typeof cacheOptions === 'object' ? cacheOptions.useCache !== false : cacheOptions !== false,
    autoRevokeOnDel: typeof cacheOptions === 'object' ? cacheOptions.autoRevokeOnDel !== false : !!cacheOptions
  };

  return new Promise<{
    width: number;
    height: number;
    contrast: string;
    measure: string;
    size: string;
    bytes: number;
    image: HTMLImageElement;
    blob: Blob;
  }>((resolve, reject) => {
    if (_cacheOptions.useCache && cache.has(img)) {
      resolve(cache.get(img)!.data);
    } else {
      loadImageWithBlob(img, false, ajaxOptions)
        .then(({ image, blob }) => {
          const { width, height } = image;
          const result = {
            width,
            height,
            contrast: calcContrast(width, height),
            measure: `${width} × ${height} px`,
            size: bytesToSize(blob.size),
            bytes: blob.size,
            image,
            blob
          };

          if (_cacheOptions.useCache) {
            cache.set(img, {
              data: result,
              r: _cacheOptions.autoRevokeOnDel
            });
          }

          resolve(result);
        })
        .catch(reject);
    }
  });
}

export default getImageInfo;
