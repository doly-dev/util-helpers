import { isObject } from './utils/type';

type NodeAssign = 'spread' | 'self';

// 交换字段名
type ExchangeFieldNames<D extends any, F extends Record<string, keyof D>> = Omit<D, F[keyof F]> & {
  [P in keyof F]: D[F[P]];
};

// 交换字段名，支持嵌套
// 先排除子级字段名，再交换字段名，然后加上子级字段名，再替换一次。
type TransformFieldNames<D extends any, F extends Record<string, any>, C extends string> = (C extends keyof D ? ExchangeFieldNames<Omit<D, C> & Record<C, TransformFieldNames<D, F, C>>, F> : ExchangeFieldNames<D, F>)[];

/**
 * 转换字段名，返回一个转换字段后的值，不改变原值。
 *
 * @static
 * @alias module:Tree.transformFieldNames
 * @since 4.14.0
 * @param {object[]} data 对象数组。如果是树结构数据，需要指定第三个参数 childrenField
 * @param {function} fieldNames 字段名映射
 * @param {string} [childrenField] 子级数据字段名
 * @param {'spread'|'self'} [nodeAssign='spread'] 节点赋值方式。spread表示使用展开运算符创建新值，self表示使用自身对象。
 * @returns {object[]}
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
function transformFieldNames<D extends any, F extends Record<string, keyof D>, C extends string>(data: D[], fieldNames: F, childrenField?: C, nodeAssign: NodeAssign = 'spread'): TransformFieldNames<D, F, C> {
  if (!Array.isArray(data)) {
    return data;
  }

  if (data.length <= 0) {
    return [];
  }

  // 递归处理字段名
  function recusion(arr: object[]) {
    return arr.map((item) => {
      if (!isObject(item)) {
        return item;
      }

      const newItem = nodeAssign === 'spread' ? { ...item } : item;
      const delKeys: string[] = [];

      // 树形数据子节点
      // @ts-ignore
      if (childrenField && Array.isArray(newItem[childrenField]) && newItem[childrenField].length > 0) {
        // @ts-ignore
        newItem[childrenField] = recusion(newItem[childrenField].slice());
      }

      // 替换字段名
      Object.keys(fieldNames).forEach((newKey) => {
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
        delKeys.forEach((delKey) => {
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
