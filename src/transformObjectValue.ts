import { forEach, isArray, isPlainObject } from 'ut2';

type PropertyName = string | symbol;

interface TransformObjectValue {
  <V>(arr: V[], fn: (value: V, index: number) => any, deep: false): any[];
  <V>(arr: V[], fn: (value: any, index: number) => any, deep?: boolean): any[];
  <T extends object>(obj: T, fn: (value: T[keyof T], key: keyof T) => any, deep: false): Record<PropertyName, any>;
  <T extends object>(obj: T, fn: (value: T[keyof T] extends object ? any : T[keyof T], key: T[keyof T] extends object ? any : keyof T) => any, deep?: boolean): Record<PropertyName, any>;
  <T>(obj: T, fn: (...args: any[]) => any): T;
}

/**
 * 创建一个转换值的新对象或数组。
 *
 * 例如 antd Form 中的设置表单值时，如果值为空字符串可能需要转为 `undefined` ，才不影响表单的初始值。
 *
 * @static
 * @alias module:Processor.transformObjectValue
 * @since 4.23.0
 * @param {Array | Object} data 要转换值的普通对象或数组
 * @param {Function} fn 遍历普通对象或数组键值方法
 * @param {boolean} [deep=true] 深度遍历，检测值为普通对象或数组时递归处理。默认 true 。
 * @returns {Array | Object} 如果是普通对象或数组，返回一个新的对象或数组，否则返回自身
 * @example
 *
 * const data1 = { foo: 'bar', baz: 42 }
 * // 数字转为字符串
 * transformObjectValue(data1, value => {
 *   if(typeof value === 'number'){
 *     return String(value)
 *   }
 *   return value;
 * });
 * // { foo: 'bar', baz: '42' }
 *
 * const data2 = [1,2,3,4];
 * // 数字转为字符串
 * transformObjectValue(data2, value=>{
 *   if(typeof value === 'number'){
 *     return String(value)
 *   }
 * });
 * // ['1', '2', '3', '4']
 *
 * // 嵌套普通对象或数组
 * const data3 = { foo: 'bar', baz: 42, c: [1,2,3,4], d: '' }
 * // 数字转为字符串，空字符串转为undefined
 * transformObjectValue(data3, value=>{
 *   if(typeof value === 'number'){
 *     return String(value);
 *   }
 *   retrun value === '' ? undefined : value
 * });
 * // { foo: 'bar', baz: '42', ['1', '2', '3', '4'], d: undefined }
 *
 * // 数组的值不处理，对象值为数字转为字符串，空字符串转为undefined
 * transformObjectValue(data3, (value, key)=>{
 *   if(typeof key === 'number'){
 *     return value;
 *   }
 *   if(typeof value === 'number'){
 *     return String(value);
 *   }
 *   retrun value === '' ? undefined : value
 * });
 * // { foo: 'bar', baz: '42', [1, 2, 3, 4], d: undefined }
 *
 */
const transformObjectValue: TransformObjectValue = function (data: any, fn: (value: any, key: any) => any, deep = true) {
  if (isPlainObject(data)) {
    const result: Record<PropertyName, any> = {};
    forEach(data, (value, key) => {
      const newValue = deep && (isPlainObject(value) || isArray(value)) ? transformObjectValue(value as any, fn) : fn(value, key);
      result[key as PropertyName] = newValue;
    });
    return result;
  } else if (isArray(data)) {
    const result: any[] = [];
    forEach(data, (value, index) => {
      const newValue = deep && (isPlainObject(value) || isArray(value)) ? transformObjectValue(value, fn) : fn(value, index);
      result.push(newValue);
    });
    return result;
  }
  return data;
};

export default transformObjectValue;
