/**
 * 检查函数执行结果。
 *
 * 如果函数执行异常或返回下列结果，则返回 `false` ，否则返回 `true`。
 * 1. `Promise.reject()`
 * 2. `Promise.resolve(false)`
 * 3. `false`
 *
 * @alias module:Other.checkResult
 * @since 5.5.0
 * @param {Function} [fn=()=>true] 处理函数，默认 `()=>true`。
 * @param {...*} [args] 展开参数，`fn` 执行参数。
 * @returns {Promise<boolean>}
 * @example
 * await checkResult(()=>throw new Error());      // false
 * await checkResult(()=>Promise.reject());       // false
 * await checkResult(()=>Promise.resolve(false)); // false
 * await checkResult(async ()=>false);            // false
 * await checkResult(()=>false);                  // false
 *
 * await checkResult(undefined);                  // true
 * await checkResult(()=>true);                   // true
 * await checkResult(()=>Promise.resolve());      // true
 * await checkResult(async ()=>true);             // true
 * await checkResult(()=>null);                   // true
 * await checkResult(()=>undefined);              // true
 * await checkResult(()=>'foo');                  // true
 *
 * // 传入参数
 * await checkResult((...args)=>args.length > 1); // false
 * await checkResult((...args)=>args.length > 1, 'a', 'b'); // true
 */
const checkResult = async <P extends any[]>(fn: (...args: P) => any | Promise<any> = () => true, ...args: P) => {
  try {
    const ret = fn instanceof Promise ? await fn : typeof fn === 'function' ? await fn(...args) : fn;
    return ret !== false;
  } catch {
    return false;
  }
};

export default checkResult;
