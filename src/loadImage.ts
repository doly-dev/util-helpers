import { isBlob } from 'ut2';

let cacheImage: string | Blob;
let cacheResult: HTMLImageElement;

/**
 * 加载图片。
 *
 * @static
 * @alias module:Other.loadImage
 * @since 4.20.0
 * @param {string | Blob} img 图片地址或 blob 对象
 * @param {boolean} [useCache=true] 缓存最近一次成功结果，当图片地址或 blob 对象一致时，直接返回该缓存。避免连续请求同一个图片资源，重复加载问题。
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
function loadImage(img: string | Blob, useCache = true) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    if (useCache && cacheImage === img && cacheResult) {
      resolve(cacheResult);
    } else {
      const imgIsBlob = isBlob(img);
      const url = imgIsBlob ? URL.createObjectURL(img as Blob) : img;
      const image = new Image();
      if (!imgIsBlob) {
        image.crossOrigin = 'anonymous';
      }
      image.onload = () => {
        if (imgIsBlob) {
          URL.revokeObjectURL(url);
        }
        if (useCache) {
          cacheImage = img;
          cacheResult = image;
        }
        resolve(image);
      };
      image.onerror = (err) => {
        if (imgIsBlob) {
          URL.revokeObjectURL(url);
        }
        console.error(`[loadImage] The image load failed, '${img}'.`);
        reject(err);
      };
      image.src = url;
    }
  });
}

export default loadImage;
