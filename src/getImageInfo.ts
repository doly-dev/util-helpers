import { round } from 'ut2';
import divide from './divide';
import gcd from './gcd';
import loadImageWithBlob from './loadImageWithBlob';
import bytesToSize from './bytesToSize';

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

let cacheImage: string | Blob;
let cacheResult: any;

/**
 * 获取图片信息。
 *
 * @static
 * @alias module:Other.getImageInfo
 * @since 4.20.0
 * @param {string | Blob} img 图片地址或 blob 对象
 * @param {boolean} [useCache=true] 缓存最近一次成功结果，当图片地址或 blob 对象一致时，直接返回该缓存。避免连续请求同一个图片资源，重复加载问题。
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
function getImageInfo(img: string | Blob, useCache = true) {
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
    if (useCache && cacheImage === img && cacheResult) {
      resolve(cacheResult);
    } else {
      loadImageWithBlob(img, false)
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

          if (useCache) {
            cacheImage = img;
            cacheResult = result;
          }

          resolve(result);
        })
        .catch(reject);
    }
  });
}

export default getImageInfo;
