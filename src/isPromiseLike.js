/**
 * 检测值是否类似Promise对象
 * 
 * @static
 * @alias module:Validator.isPromiseLike
 * @since 3.8.0
 * @param {*} obj 要检测的值
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
function isPromiseLike(obj) {
  return (
    obj !== null &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  );
}

export default isPromiseLike;