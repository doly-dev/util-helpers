export default isPromiseLike;
/**
 * 检测值是否类似Promise对象
 *
 * @static
 * @alias module:Validator.isPromiseLike
 * @since 3.8.0
 * @param {any} obj 要检测的值
 * @returns {boolean} 是否类似Promise对象
 * @example
 *
 * isPromiseLike([]);
 * => false
 *
 * isPromiseLike({then:()=>{}});
 * => true
 *
 * isPromiseLike(Promise.resolve());
 * => true
 */
declare function isPromiseLike(obj: any): boolean;
