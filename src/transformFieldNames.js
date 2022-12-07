/**
 * 转换字段名。 不改变原值。
 * 
 * @static
 * @alias module:Processor.transformFieldNames
 * @since 4.14.0
 * @template {Object.<string,any>} [R=Object.<string,any>]
 * @param {object[]} data 对象数组，支持树形结构数据
 * @param {Object.<string,string>} fieldNames 字段名映射
 * @param {string} [childrenFieldName='children'] 如果是树形结构数据，子数据的字段名
 * @returns {R[]}
 * @example
 * 
 * const options = [{code: '1', name: 'one'},{code:'2', name:'two'}];
 * const newOptions = transformFieldNames(options, {label: 'name', value: 'code'});
 * // => [{value: '1', label: 'one'},{value:'2', label:'two'}]
 * 
 * // 支持嵌套数据，默认子集字段名为 children
 * const options2 = [{code: '1', name: 'one'},{code:'2', name:'two', children: [{code:'2-1', name:'two-one', children: [{code: '2-1-1', name:'two-one-one'}]}]}];
 * const newOptions2 = transformFieldNames(options2, {label: 'name', value: 'code'});
 * // => [{value: '1', label: 'one'},{value:'2', label:'two', children: [{value: '2-1', label:'two-one', children: [{value: '2-1-1', label:'two-one-one'}]}]}]
 * 
 * // 自定义子集字段名
 * const options3 = [{code: '1', name: 'one'},{code:'2', name:'two', childs: [{code:'2-1', name:'two-one'}]}];
 * const newOptions3 = transformFieldNames(options3, {label: 'name', value: 'code'}, 'childs');
 * // => [{value: '1', label: 'one'},{value:'2', label:'two', childs: [{value: '2-1', label:'two-one'}]}]
 * 
 * // 自定义子集字段名，并且替换子集字段名
 * const newOptions4 = transformFieldNames(options3, {label: 'name', value: 'code', children: 'childs'}, 'childs');
 * // => [{value: '1', label: 'one'},{value:'2', label:'two', children: [{value: '2-1', label:'two-one'}]}]
 */
function transformFieldNames(data, fieldNames, childrenFieldName = 'children') {
  if (!Array.isArray(data)) {
    return data;
  }

  if (data.length <= 0) {
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
      if (typeof item !== 'object' || !item) {
        return item;
      }

      const newItem = { ...item };
      /** @type {Array.<string>} */
      const delKeys = [];

      // 树形数据子节点
      // @ts-ignore
      if (Array.isArray(newItem[childrenFieldName]) && newItem[childrenFieldName].length > 0) {
        // @ts-ignore
        newItem[childrenFieldName] = recusion(newItem[childrenFieldName].slice());
      }

      // 替换字段名
      Object.keys(fieldNames).forEach(newKey => {
        const oldKey = fieldNames[newKey];
        if (oldKey in newItem) {
          // @ts-ignore
          newItem[newKey] = newItem[oldKey];
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

  return recusion(data.slice());
}

export default transformFieldNames;