import { forEach, isArray, isObject } from 'ut2';

/**
 * 内部实现
 *
 * @private
 * @param {Object[]} tree 树结构数据
 * @param {function} predicate 遍历每一项执行的函数，参数是当前遍历到的节点数据，如果返回 Truthy 将返回包含该节点的所有父级节点
 * @param {string} [childrenField] 子级字段名
 * @param {Object[]} [path=[]] 当前遍历路径
 * @returns {Object[]}
 */
function internalFindTreeSelect<T extends any, F extends (item: T) => boolean>(tree: T[], predicate: F, childrenField?: string, path: T[] = []): T[] {
  let result: T[] = [];

  if (isArray(tree)) {
    forEach(tree, (item) => {
      path.push(item);

      if (predicate(item)) {
        result = path;
        return false;
      }

      if (isObject(item)) {
        // @ts-ignore
        const childs = item[childrenField] as T[];

        if (isArray(childs) && childs.length > 0) {
          const findChildren = internalFindTreeSelect(childs, predicate, childrenField, path);
          if (findChildren.length > 0) {
            result = findChildren;
            return false;
          }
        }
      }

      path.pop();
    });
  }

  return result;
}

/**
 * 查找包含当前节点的所有父级节点
 *
 * @static
 * @alias module:Tree.findTreeSelect
 * @since 4.14.0
 * @param {Object[]} tree 树结构数据
 * @param {function} predicate 遍历每一项执行的函数，参数是当前遍历到的节点数据，如果返回 Truthy 将返回包含该节点的所有父级节点
 * @param {string} [childrenField='children'] 子级字段名
 * @returns {Object[]}
 * @example
 * const menus = [{ id: '1', name: '首页', code: 'trade', pid: null }, { id: '2', name: '交易管理', code: 'trade', pid: null, children: [{ id: '3', name: '交易查询', code: 'trade-1', pid: '2', children: [{ id: '4', name: '交易查询-查询操作', code: 'trade-1-1', pid: '3' }]}]}, { id: '5', name: '权限管理', code: 'authorization', pid: null, children: [{ id: '6', name: '角色管理', code: 'authorization-1', pid: '5' }, { id: '7', name: '用户管理', code: 'authorization-2', pid: '5' }]}];
 *
 * findTreeSelect(menus, item => item.id === '2');
 * // [{id:'2',name:'交易管理',code:'trade',pid:null,children:[{id:'3',name:'交易查询',code:'trade-1',pid:'2',children:[{id:'4',name:'交易查询-查询操作',code:'trade-1-1',pid:'3'}]}]}]
 *
 * findTreeSelect(menus, item => item.id === '7');
 * // [{id:'5',name:'权限管理',code:'authorization',pid:null,children:[{id:'6',name:'角色管理',code:'authorization-1',pid:'5'},{id:'7',name:'用户管理',code:'authorization-2',pid:'5'}]},{id:'7',name:'用户管理',code:'authorization-2',pid:'5'}]
 *
 * findTreeSelect(menus, item => item.id === 'not found');
 * // []
 */
function findTreeSelect<T extends any, F extends (item: T) => boolean>(tree: T[], predicate: F, childrenField = 'children') {
  return internalFindTreeSelect(tree, predicate, childrenField);
}

export default findTreeSelect;
