import { isBlob } from 'ut2';
import ajax from './ajax';

const SuccessResponseStatus = [200, 304];

/**
 * 获取文件 Blob 。
 *
 * @static
 * @alias module:Other.getFileBlob
 * @since 4.21.0
 * @param {string | Blob} file 文件地址或对象。
 * @param {AjaxOptions} [ajaxOptions] ajax 请求配置项，当传入的图片为字符串时才会触发请求。
 * @returns {Promise<Blob>} 文件 Blob 。
 * @example
 *
 * getFileBlob(file).then((blob)=>{
 *    // do something
 * });
 *
 * getFileBlob('https://dummyimage.com/200x300').then((blob)=>{
 *   // do something
 * });
 */
function getFileBlob(file: string | Blob, ajaxOptions?: Parameters<typeof ajax>[1]) {
  return new Promise<Blob>((resolve, reject) => {
    if (isBlob(file)) {
      resolve(file);
    } else {
      ajax(file, { responseType: 'blob', ...ajaxOptions })
        .then((ev) => {
          // @ts-ignore
          // 进入 onload 表示 readyStatus 为 4 ，但是 status 不一定是 200 。
          const responseStatus = ev.target.status;
          if (SuccessResponseStatus.indexOf(responseStatus) !== -1) {
            // @ts-ignore
            resolve(ev.target.response as Blob);
          } else {
            const err = new Error(`The file does not support get requests, responseStatus ${responseStatus}, '${file}'.`);
            console.error(err);
            reject(err);
          }
        })
        .catch((err) => {
          console.error(new Error(`Failed to request file. ${err}`));
          reject(err);
        });
    }
  });
}

export default getFileBlob;
