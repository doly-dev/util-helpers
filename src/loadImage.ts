import { isBlob } from 'ut2';
import { createObjectURL, revokeObjectURL } from './utils/native';
import Cache from './utils/Cache';

type Result = HTMLImageElement;
const cache = new Cache<
  {
    data: Result;
    r: boolean;
  },
  string | Blob
>({ max: 1 });

cache.on('del', (v) => {
  if (v.r) {
    try {
      revokeObjectURL(v.data.src);
    } catch {
      /* empty */
    }
  }
});

/**
 * @typedef {Object} CacheOptions 缓存配置
 * @property {boolean} [useCache=true] 是否使用缓存
 * @property {boolean} [autoRevokeOnDel=true] 删除时自动释放缓存
 */

/**
 * 加载图片。
 *
 * <em style="font-weight: bold;">注意：该方法仅适用于浏览器端。</em>
 *
 * @static
 * @alias module:Other.loadImage
 * @since 4.20.0
 * @param {string | Blob} img 图片地址或 blob 对象
 * @param {boolean | CacheOptions} [cacheOptions=true] 是否使用缓存。开启后，自动缓存最近上一次成功的结果，当图片地址或 blob 对象一致时，直接返回该缓存。避免连续请求同一个图片资源，重复加载。当缓存下一次成功加载的图片时，会自动释放上一次缓存的图片，也可以通过 `autoRevokeOnDel` 设置不释放缓存。
 * @returns {Promise<HTMLImageElement>} HTML图片元素
 * @example
 *
 * loadImage(file).then(image=>{
 *    // do something
 * });
 *
 * loadImage('https://dummyimage.com/200x300').then(image=>{
 *   // do something
 * });
 *
 * loadImage('data:image/png;base64,PGEgaWQ9ImEiPjxiIGlkPSJiIj5oZXkhPC9iPjwvYT4=').then(image=>{
 *   // do something
 * });
 *
 */
function loadImage(img: string | Blob, cacheOptions: boolean | { useCache?: boolean; autoRevokeOnDel?: boolean } = true) {
  const _cacheOptions = {
    useCache: typeof cacheOptions === 'object' ? cacheOptions.useCache !== false : cacheOptions !== false,
    autoRevokeOnDel: typeof cacheOptions === 'object' ? cacheOptions.autoRevokeOnDel !== false : !!cacheOptions
  };
  return new Promise<HTMLImageElement>((resolve, reject) => {
    if (_cacheOptions.useCache && cache.has(img)) {
      resolve(cache.get(img)!.data);
    } else {
      const imgIsBlob = isBlob(img);
      const url = imgIsBlob ? createObjectURL(img as Blob) : img;
      const image = new Image();
      if (!imgIsBlob) {
        image.crossOrigin = 'anonymous';
      }
      image.onload = () => {
        if (_cacheOptions.useCache) {
          cache.set(img, {
            data: image,
            r: _cacheOptions.autoRevokeOnDel
          });
        }
        resolve(image);
      };
      image.onerror = (err) => {
        if (imgIsBlob) {
          revokeObjectURL(url);
        }
        console.error(`[loadImage] The image load failed, '${img}'.`);
        reject(err);
      };
      image.src = url;
    }
  });
}

export default loadImage;
