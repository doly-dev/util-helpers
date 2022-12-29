import { isObject } from "./utils/type";

/**
 * 递归处理空子级
 * 
 * @private
 * @template {Record<string,any>} [T=Record<string,any>]
 * @param {T[]} arr 列表数据
 * @param {object} options 配置项
 * @param {string} [options.childrenField='children'] 子级字段名称
 * @param {'none'|'null'|'array'} [options.emptyChildrenValue='none'] 子级为空时的值，none表示删除该子级，null表示为null，array表示为[]。
 */
function processEmptyChildren(arr, options = {}) {
  const { childrenField = 'children', emptyChildrenValue = 'none' } = options;
  arr.forEach(item => {
    if (isObject(item) && Array.isArray(item[childrenField])) {
      if (item[childrenField].length <= 0) {
        if (emptyChildrenValue === 'null') {
          // @ts-ignore
          item[childrenField] = null;
        } else if (emptyChildrenValue === 'none') {
          delete item[childrenField];
        }
      } else {
        processEmptyChildren(item[childrenField], options);
      }
    }
  });
}

/**
 * 列表数据转树结构
 * 
 * @static
 * @alias module:Processor.listToTree
 * @since 4.14.0
 * @template {Record<string,any>} [T=Record<string,any>]
 * @template {*} [R=T&Record<string,any>]
 * @param {T[]} list 列表数据
 * @param {object} options 配置项
 * @param {string} [options.keyField='id'] 当前数据的键值字段名称
 * @param {string} [options.parentField='pid'] 当前数据的父级字段名称
 * @param {string} [options.childrenField='children'] 子级字段名称
 * @param {'none'|'null'|'array'} [options.emptyChildrenValue='none'] 子级为空时的值，none表示删除该子级，null表示为null，array表示为[]。
 * @param {'spread'|'self'} [options.nodeAssign='spread'] 节点赋值方式。spread表示使用展开运算符创建新值，self表示使用自身对象。
 * @returns {R[]} 树结构
 * @example
 * 
 * const menus = [
 *   { id: '1', name: '首页', code: 'trade', pid: null },
 *   { id: '2', name: '交易管理', code: 'trade', pid: null },
 *   { id: '3', name: '交易查询', code: 'trade-1', pid: '2' },
 *   { id: '4', name: '交易查询-查询操作', code: 'trade-1-1', pid: '3' },
 *   { id: '5', name: '权限管理', code: 'authorization', pid: null },
 *   { id: '6', name: '角色管理', code: 'authorization-1', pid: '5' },
 *   { id: '7', name: '用户管理', code: 'authorization-2', pid: '5' }
 * ];
 * listToTree(menus); 
 * // [{"id":"1","name":"首页","code":"trade","pid":null},{"id":"2","name":"交易管理","code":"trade","pid":null,"children":[{"id":"3","name":"交易查询","code":"trade-1","pid":"2","children":[{"id":"4","name":"交易查询-查询操作","code":"trade-1-1","pid":"3"}]}]},{"id":"5","name":"权限管理","code":"authorization","pid":null,"children":[{"id":"6","name":"角色管理","code":"authorization-1","pid":"5"},{"id":"7","name":"用户管理","code":"authorization-2","pid":"5"}]}]
 * 
 * // 自定义子级字段名
 * listToTree(basicMenus, { childrenField: 'childs' });
 * // [{"id":"1","name":"首页","code":"trade","pid":null},{"id":"2","name":"交易管理","code":"trade","pid":null,"childs":[{"id":"3","name":"交易查询","code":"trade-1","pid":"2","childs":[{"id":"4","name":"交易查询-查询操作","code":"trade-1-1","pid":"3"}]}]},{"id":"5","name":"权限管理","code":"authorization","pid":null,"childs":[{"id":"6","name":"角色管理","code":"authorization-1","pid":"5"},{"id":"7","name":"用户管理","code":"authorization-2","pid":"5"}]}]
 * 
 */
function listToTree(list, options = {}) {
  const { keyField = 'id', parentField = 'pid', childrenField = 'children', emptyChildrenValue = 'none', nodeAssign = 'spread' } = options;

  /** @type {R[]} */
  const tree = [];

  /** @type {Object.<string, T[]>} */
  const record = {};

  list.forEach(item => {
    if (isObject(item)) {
      const newItem = nodeAssign === 'spread' ? { ...item } : item;

      /** @type {string} */
      const id = newItem[keyField];

      /** @type {string} */
      const pid = newItem[parentField];

      if (record[id]) {
        // @ts-ignore
        newItem[childrenField] = record[id];
      } else {
        // @ts-ignore
        newItem[childrenField] = record[id] = [];
      }

      if (pid) {
        if (!record[pid]) {
          record[pid] = [newItem];
        } else {
          record[pid].push(newItem);
        }
      } else {
        // @ts-ignore
        tree.push(newItem);
      }
    }
  });

  if (emptyChildrenValue !== 'array') {
    // @ts-ignore
    processEmptyChildren(tree, options);
  }

  return tree;
}

export default listToTree;