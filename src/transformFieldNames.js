// 修改类型，请同步到 transformFieldNames.type.js
// 修改文档，请同步到 transformFieldNames.doc.js

import { isObject } from './utils/type';

/**
 * 转换字段名，返回一个转换字段后的值，不改变原值。
 * 
 * @static
 * @alias module:Processor.transformFieldNames
 * @since 4.14.0
 * @template {*} D
 * @template {Record<string, keyof D>} F
 * @template {string} C
 * @param {D[]} data 对象数组。如果是树结构数据，需要指定第三个参数 childrenFieldName
 * @param {F} fieldNames 字段名映射
 * @param {C} [childrenFieldName] 子级数据字段名
 * @returns {import('./transformFieldNames.type.js').TransformFieldNames<D, F, C>}
 * @example
 * 
 * const options = [{code: '1', name: 'one'},{code:'2', name:'two'}];
 * const newOptions = transformFieldNames(options, {label: 'name', value: 'code'});
 * // [{value: '1', label: 'one'},{value:'2', label:'two'}]
 * 
 * // 嵌套数据，指定子级字段名 children
 * const options2 = [{code: '1', name: 'one'},{code:'2', name:'two', children: [{code:'2-1', name:'two-one', children: [{code: '2-1-1', name:'two-one-one'}]}]}];
 * const newOptions2 = transformFieldNames(options2, {label: 'name', value: 'code'}, 'children');
 * // [{value: '1', label: 'one'},{value:'2', label:'two', children: [{value: '2-1', label:'two-one', children: [{value: '2-1-1', label:'two-one-one'}]}]}]
 * 
 * const options3 = [{code: '1', name: 'one'},{code:'2', name:'two', childs: [{code:'2-1', name:'two-one'}]}];
 * const newOptions3 = transformFieldNames(options3, {label: 'name', value: 'code'}, 'childs');
 * // [{value: '1', label: 'one'},{value:'2', label:'two', childs: [{value: '2-1', label:'two-one'}]}]
 * 
 * // 嵌套数据，并替换子集字段名
 * const newOptions4 = transformFieldNames(options3, {label: 'name', value: 'code', children: 'childs'}, 'childs');
 * // [{value: '1', label: 'one'},{value:'2', label:'two', children: [{value: '2-1', label:'two-one'}]}]
 */
function transformFieldNames(data, fieldNames, childrenFieldName) {
  if (!Array.isArray(data)) {
    return data;
  }

  if (data.length <= 0) {
    // @ts-ignore
    return [];
  }

  /**
   * 递归处理字段名
   * 
   * @param {Array.<object>} arr 列表数据
   * @returns {*}
   */
  function recusion(arr = []) {
    return arr.map(item => {
      if (!isObject(item)) {
        return item;
      }

      const newItem = { ...item };
      /** @type {Array.<string>} */
      const delKeys = [];

      // 树形数据子节点
      // @ts-ignore
      if (childrenFieldName && Array.isArray(newItem[childrenFieldName]) && newItem[childrenFieldName].length > 0) {
        // @ts-ignore
        newItem[childrenFieldName] = recusion(newItem[childrenFieldName].slice());
      }

      // 替换字段名
      Object.keys(fieldNames).forEach(newKey => {
        const oldKey = fieldNames[newKey];
        if (oldKey in newItem) {
          // @ts-ignore
          newItem[newKey] = newItem[oldKey];
          // @ts-ignore
          delKeys.push(oldKey);
        }
      });

      // 删除旧字段
      if (delKeys.length > 0) {
        delKeys.forEach(delKey => {
          // @ts-ignore
          delete newItem[delKey];
        });
      }

      return newItem;
    });
  }

  // @ts-ignore
  return recusion(data.slice());
}

export default transformFieldNames;