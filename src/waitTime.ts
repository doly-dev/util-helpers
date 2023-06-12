import { sleep } from 'ut2';

/**
 * 等待时间返回 Promise 。常用于异步方法中延时。
 *
 * @static
 * @alias module:Other.waitTime
 * @since 4.2.0
 * @deprecated 即将废弃，请使用 `import { sleep } from 'ut2'`
 * @param {number} [time=1000] 延时时间，单位毫秒
 * @returns {Promise<void>}
 * @example
 *
 * const test = async ()=>{
 *   await waitTime();
 *   // do something
 * }
 *
 * waitTime(500).then(()=>{
 *   // do something
 * });
 *
 */
function waitTime(time = 1000) {
  return sleep(time);
}

export default waitTime;
