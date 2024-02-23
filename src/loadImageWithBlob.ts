import { createObjectURL, revokeObjectURL } from './utils/native';
import getFileBlob from './getFileBlob';
import Cache from './utils/Cache';

type Result = { image: HTMLImageElement; blob: Blob };
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
      revokeObjectURL(v.data.image.src);
    } catch {
      /* empty */
    }
  }
});

/**
 * @typedef {Object} ImageWithBlob HTML图片元素和 blob 对象
 * @property {HTMLImageElement} image HTML图片元素
 * @property {Blob} blob blob 对象
 */

/**
 * 加载图片，返回图片元素和 blob 对象。
 *
 * <em style="font-weight: bold;">注意：该方法仅适用于浏览器端。</em>
 *
 * @method
 * @alias module:Other.loadImageWithBlob
 * @since 4.20.0
 * @param {string | Blob} img 图片地址或 blob 对象
 * @param {boolean | CacheOptions} [cacheOptions=true] 是否使用缓存。开启后，自动缓存最近上一次成功的结果，当图片地址或 blob 对象一致时，直接返回该缓存。避免连续请求同一个图片资源，重复加载。当缓存下一次成功加载的图片时，会自动释放上一次缓存的图片，也可以通过 `autoRevokeOnDel` 设置不释放缓存。
 * @param {AjaxOptions} [ajaxOptions] ajax 请求配置项，当传入的图片为字符串时才会触发请求。
 * @returns {Promise<ImageWithBlob>} HTML图片元素和 blob 对象
 * @example
 *
 * loadImage(file).then(({image, blob})=>{
 *    // do something
 * });
 *
 * loadImage('https://dummyimage.com/200x300').then(({image, blob})=>{
 *   // do something
 * });
 *
 * loadImage('data:image/png;base64,PGEgaWQ9ImEiPjxiIGlkPSJiIj5oZXkhPC9iPjwvYT4=').then(({image, blob})=>{
 *   // do something
 * });
 *
 */
function loadImageWithBlob(img: string | Blob, cacheOptions: boolean | { useCache?: boolean; autoRevokeOnDel?: boolean } = true, ajaxOptions?: Parameters<typeof getFileBlob>[1]) {
  const _cacheOptions = {
    useCache: typeof cacheOptions === 'object' ? cacheOptions.useCache !== false : cacheOptions !== false,
    autoRevokeOnDel: typeof cacheOptions === 'object' ? cacheOptions.autoRevokeOnDel !== false : !!cacheOptions
  };
  return new Promise<{ image: HTMLImageElement; blob: Blob }>((resolve, reject) => {
    if (_cacheOptions.useCache && cache.has(img)) {
      resolve(cache.get(img)!.data);
    } else {
      getFileBlob(img, ajaxOptions)
        .then((blob) => {
          const url = createObjectURL(blob);
          const image = new Image();
          image.onload = () => {
            const result = { blob, image };
            if (_cacheOptions.useCache) {
              cache.set(img, {
                data: result,
                r: _cacheOptions.autoRevokeOnDel
              });
            }
            resolve(result);
          };
          image.onerror = (err) => {
            revokeObjectURL(url);
            console.error(`[loadImageWithBlob] The image load failed, '${img}'.`);
            reject(err);
          };
          image.src = url;
        })
        .catch(reject);
    }
  });
}

export default loadImageWithBlob;
