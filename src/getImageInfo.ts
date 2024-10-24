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

/**
 * 获取图片信息。
 *
 * <em style="font-weight: bold;">注意：该方法仅适用于浏览器端。</em>
 *
 * @alias module:Browser.getImageInfo
 * @since 4.20.0
 * @param {string | Blob} img 图片地址或 blob 对象。
 * @param {AjaxOptions} [ajaxOptions] ajax 请求配置项，当传入的图片为字符串时才会触发请求。
 * @returns {Promise<ImageInfo>} 图片信息。
 * @example
 *
 * getImageInfo(file).then(imageInfo=>{
 *   console.log(imageInfo);
 *   // {
 *   //   width: 100,
 *   //   height: 100,
 *   //   contrast: '1:1',
 *   //   measure: '100 × 100 px',
 *   //   size: '11 B',
 *   //   bytes: 11,
 *   //   image: HTMLImageElement {},
 *   //   blob: Blob {}
 *   // }
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
function getImageInfo(img: string | Blob, ajaxOptions?: Parameters<typeof loadImageWithBlob>[1]) {
  return loadImageWithBlob(img, ajaxOptions).then(({ image, blob }) => {
    const { width, height } = image;
    return {
      width,
      height,
      contrast: calcContrast(width, height),
      measure: `${width} × ${height} px`,
      size: bytesToSize(blob.size),
      bytes: blob.size,
      image,
      blob
    };
  });
}

export default getImageInfo;
