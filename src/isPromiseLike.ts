import { isPromiseLike as _isPromiseLike } from 'ut2';

/**
 * 检测值是否类似Promise对象
 *
 * @ignore
 * @static
 * @alias module:Validator.isPromiseLike
 * @since 3.8.0
 * @deprecated 即将废弃，请使用 `import { isPromiseLike } 'ut2'`
 * @param {*} obj 要检测的值
 * @returns {boolean} 是否类似Promise对象
 * @example
 *
 * isPromiseLike([]); // false
 * isPromiseLike({ then: () => { } }); // true
 * isPromiseLike(Promise.resolve()); // true
 *
 */
function isPromiseLike(obj: any) {
  return _isPromiseLike(obj);
}

export default isPromiseLike;
