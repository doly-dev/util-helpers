import { isArray, isObject } from 'ut2';

type NodeAssign = 'spread' | 'self';

type Options = {
  keyField?: string;
  parentField?: string;
  childrenField?: string;
  emptyChildrenValue?: 'none' | 'null' | 'array';
  nodeAssign?: NodeAssign;
};

/**
 * 递归处理空子级
 *
 * @private
 * @param {Object[]} arr 列表数据
 * @param {Object} [options] 配置项
 * @param {string} [options.childrenField='children'] 子级字段名称，默认`children`
 * @param {'none'|'null'} [options.emptyChildrenValue='none'] 子级为空时的值，默认`none`。`none`表示删除该子级，`null`表示为`null`，`array`表示为`[]`。
 */
function processEmptyChildren<T extends Record<string, any> = Record<string, any>>(arr: T[], options: Pick<Options, 'childrenField' | 'emptyChildrenValue'>) {
  const { childrenField = 'children', emptyChildrenValue = 'none' } = options;
  arr.forEach((item) => {
    if (item[childrenField].length <= 0) {
      if (emptyChildrenValue === 'null') {
        // @ts-ignore
        item[childrenField] = null;
      } else {
        delete item[childrenField];
      }
    } else {
      processEmptyChildren(item[childrenField], options);
    }
  });
}

/**
 * 列表数据转树结构
 *
 * @static
 * @alias module:Tree.listToTree
 * @since 4.14.0
 * @param {Object[]} list 列表数据
 * @param {Object} [options] 配置项
 * @param {string} [options.keyField='id'] 当前数据的键值字段名称，默认`id`
 * @param {string} [options.parentField='pid'] 当前数据的父级字段名称，默认`pid`
 * @param {string} [options.childrenField='children'] 子级字段名称，默认`children`
 * @param {'none'|'null'|'array'} [options.emptyChildrenValue='none'] 子级为空时的值，默认`none`。`none`表示删除该子级，`null`表示为`null`，`array`表示为`[]`。
 * @param {'spread'|'self'} [options.nodeAssign='spread'] 节点赋值方式，默认`spread`。`spread`表示使用展开运算符创建新值，`self`表示使用自身对象。
 * @returns {Object[]} 树结构
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
 * // [{id:'1',name:'首页',code:'trade',pid:null},{id:'2',name:'交易管理',code:'trade',pid:null,children:[{id:'3',name:'交易查询',code:'trade-1',pid:'2',children:[{id:'4',name:'交易查询-查询操作',code:'trade-1-1',pid:'3'}]}]},{id:'5',name:'权限管理',code:'authorization',pid:null,children:[{id:'6',name:'角色管理',code:'authorization-1',pid:'5'},{id:'7',name:'用户管理',code:'authorization-2',pid:'5'}]}]
 *
 * // 自定义子级字段名
 * listToTree(basicMenus, { childrenField: 'childs' });
 * // [{id:'1',name:'首页',code:'trade',pid:null},{id:'2',name:'交易管理',code:'trade',pid:null,childs:[{id:'3',name:'交易查询',code:'trade-1',pid:'2',childs:[{id:'4',name:'交易查询-查询操作',code:'trade-1-1',pid:'3'}]}]},{id:'5',name:'权限管理',code:'authorization',pid:null,childs:[{id:'6',name:'角色管理',code:'authorization-1',pid:'5'},{id:'7',name:'用户管理',code:'authorization-2',pid:'5'}]}]
 *
 */
function listToTree<T extends Record<string, any> = Record<string, any>, R extends unknown = T & Record<string, any>>(list: T[], options: Options = {}) {
  const { keyField = 'id', parentField = 'pid', childrenField = 'children', emptyChildrenValue = 'none', nodeAssign = 'spread' } = options;

  const tree: R[] = [];

  const record: Record<string, T[]> = {};

  if (!isArray(list)) {
    return tree;
  }

  list.forEach((item) => {
    if (isObject(item)) {
      const newItem = nodeAssign === 'spread' ? { ...item } : item;

      const id = newItem[keyField] as string;
      const pid = newItem[parentField] as string;

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
