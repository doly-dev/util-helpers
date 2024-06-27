import { forEach, isArray, isObject } from 'ut2';

/**
 * 查找树结构数据节点
 *
 * @static
 * @alias module:Tree.findTreeNode
 * @since 4.14.0
 * @param {Object[]} tree 树结构数据
 * @param {function} predicate 遍历每一项执行的函数，参数是当前遍历到的节点数据，如果返回 `Truthy` ，将返回该节点
 * @param {string} [childrenField='children'] 子级字段名
 * @returns {Object|undefined}
 * @example
 * const menus = [{ id: '1', name: '首页', code: 'trade', pid: null }, { id: '2', name: '交易管理', code: 'trade', pid: null, children: [{ id: '3', name: '交易查询', code: 'trade-1', pid: '2', children: [{ id: '4', name: '交易查询-查询操作', code: 'trade-1-1', pid: '3' }]}]}, { id: '5', name: '权限管理', code: 'authorization', pid: null, children: [{ id: '6', name: '角色管理', code: 'authorization-1', pid: '5' }, { id: '7', name: '用户管理', code: 'authorization-2', pid: '5' }]}];
 *
 * findTreeNode(menus, item=>item.id === '2');
 * // {id: '2', name: '交易管理', code: 'trade', pid: null, children: [ { id: '3', name: '交易查询', code: 'trade-1', pid: '2', children: [{ id: '4', name: '交易查询-查询操作', code: 'trade-1-1', pid: '3' }]}]}
 *
 * findTreeNode(menus, item=>item.id === '7');
 * // { id: '7', name: '用户管理', code: 'authorization-2', pid: '5' }
 *
 * findTreeNode(menus, item=>item.id === 'not found');
 * // undefined
 */
function findTreeNode<T extends any, F extends (item: T) => boolean>(tree: T[], predicate: F, childrenField = 'children') {
  const stack: T[] = [];

  let node: T | undefined;

  if (isArray(tree)) {
    forEach(tree, (item) => {
      stack.push(item);

      while (stack.length) {
        const temp = stack.pop() as T;
        if (predicate(temp)) {
          node = temp;
          break;
        }

        if (isObject(temp)) {
          // @ts-ignore
          const childs = temp[childrenField] as T[];
          if (isArray(childs) && childs.length > 0) {
            childs.forEach((c) => {
              stack.push(c);
            });
          }
        }
      }

      if (node) {
        return false;
      }
    });
  }

  return node;
}

export default findTreeNode;
