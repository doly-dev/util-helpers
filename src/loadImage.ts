import { isBlob } from 'ut2';
import { createObjectURL, revokeObjectURL } from './utils/native';

/**
 * 加载图片。
 *
 * <em style="font-weight: bold;">注意：该方法仅适用于浏览器端。</em>
 *
 * @static
 * @alias module:Other.loadImage
 * @since 4.20.0
 * @param {string | Blob} img 图片地址或 blob 对象
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
function loadImage(img: string | Blob) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const imgIsBlob = isBlob(img);
    const url = imgIsBlob ? createObjectURL(img as Blob) : img;
    const image = new Image();
    if (!imgIsBlob) {
      image.crossOrigin = 'anonymous';
    }
    image.onload = () => {
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
  });
}

export default loadImage;
