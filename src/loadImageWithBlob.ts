import { createObjectURL, revokeObjectURL } from './utils/native';
import getFileBlob from './getFileBlob';

let cacheImage: string | Blob;
let cacheResult: { image: HTMLImageElement; blob: Blob };

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
 * @param {boolean} [useCache=true] 缓存最近一次成功结果，当图片地址或 blob 对象一致时，直接返回该缓存。避免连续请求同一个图片资源，重复加载问题。
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
function loadImageWithBlob(img: string | Blob, useCache = true, ajaxOptions?: Parameters<typeof getFileBlob>[1]) {
  return new Promise<{ image: HTMLImageElement; blob: Blob }>((resolve, reject) => {
    if (useCache && cacheImage === img && cacheResult) {
      resolve(cacheResult);
    } else {
      getFileBlob(img, ajaxOptions)
        .then((blob) => {
          const url = createObjectURL(blob);
          const image = new Image();
          image.onload = () => {
            revokeObjectURL(url);
            const result = { blob, image };
            if (useCache) {
              cacheImage = img;
              cacheResult = result;
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
