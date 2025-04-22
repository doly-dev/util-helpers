interface CheckResult {
  <P extends any[]>(fn: (...args: P) => Promise<any>, ...args: P): Promise<boolean>;
  <P extends any[]>(fn: (...args: P) => any, ...args: P): Promise<boolean>;
  (value: any): Promise<boolean>;
}

/**
 * 检查函数执行/值的结果。
 *
 * 如果参数是函数，将立即执行，执行异常或返回下列结果（异步会等待结果），则返回 `false` ，否则返回 `true`。
 * 1. `Promise.reject()`
 * 2. `Promise.resolve(false)`
 * 3. `false`
 *
 * 如果参数是 `Promise`，等待异步返回为下列结果，则返回 `false` ，否则返回 `true`。
 * 1. `reject()`
 * 2. `false`
 *
 * 如果参数是其他类型（非函数或 `Promise`）且等于 `false`，则返回 `false`，否则返回 `true`。
 *
 * @alias module:Other.checkResult
 * @since 5.5.0
 * @param {Function} [fn] 处理函数，默认 `()=>true`。
 * @param {...*} [args] 展开参数，`fn` 执行参数。
 * @returns {Promise<boolean>}
 * @example
 * await checkResult(() => throw new Error());      // false
 * await checkResult(() => Promise.reject());       // false
 * await checkResult(() => Promise.resolve(false)); // false
 * await checkResult(async () => false);            // false
 * await checkResult(() => false);                  // false
 *
 * await checkResult(undefined);                    // true
 * await checkResult(() => true);                   // true
 * await checkResult(() => Promise.resolve());      // true
 * await checkResult(async () => true);             // true
 * await checkResult(() => null);                   // true
 * await checkResult(() => undefined);              // true
 * await checkResult(() => 'foo');                  // true
 *
 * // 传入参数
 * await checkResult((...args) => args.length > 1); // false
 * await checkResult((...args) => args.length > 1, 'a', 'b'); // true
 */
const checkResult: CheckResult = async (fn: any, ...args: any[]) => {
  try {
    const ret = fn instanceof Promise ? await fn : typeof fn === 'function' ? await fn(...args) : fn;
    return ret !== false;
  } catch {
    return false;
  }
};

export default checkResult;
