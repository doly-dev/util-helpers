import { isArray, isObject } from 'ut2';

type NodeAssign = 'spread' | 'self';

/**
 * 过滤/筛选树节点。
 *
 * 如果某节点被过滤掉，它的子节点也一并抛弃。
 *
 * @static
 * @alias module:Tree.filterTree
 * @since 4.15.0
 * @param {Object[]} tree 树结构数据
 * @param {function} predicate 遍历每一项执行的函数，参数是当前遍历到的节点数据，如果返回 `Truthy` ，结果将包含该节点
 * @param {string} [childrenField='children'] 子级字段名，默认`children`
 * @param {'spread'|'self'} [nodeAssign='spread'] 节点赋值方式，默认`spread`。`spread`表示使用展开运算符创建新值，`self`-表示使用自身对象。
 * @returns {Object[]}
 * @example
 * const menus = [{ id: '1', name: '首页', code: 'trade', pid: null }, { id: '2', name: '交易管理', code: 'trade', pid: null, children: [{ id: '3', name: '交易查询', code: 'trade-1', pid: '2', children: [{ id: '4', name: '交易查询-查询操作', code: 'trade-1-1', pid: '3' }]}]}, { id: '5', name: '权限管理', code: 'authorization', pid: null, children: [{ id: '6', name: '角色管理', code: 'authorization-1', pid: '5' }, { id: '7', name: '用户管理', code: 'authorization-2', pid: '5' }]}];
 *
 * filterTree(menus, item=>item.name.indexOf('管理') > -1);
 * // [{ id: '2', name: '交易管理', code: 'trade', pid: null, children: [] }, { id: '5', name: '权限管理', code: 'authorization', pid: null, children: [{ id: '6', name: '角色管理', code: 'authorization-1', pid: '5' }, { id: '7', name: '用户管理', code: 'authorization-2', pid: '5' }]}]

 *
 * // 如果某节点被过滤掉，它的子节点也一并抛弃
 * filterTree(menus, item=>item.id === '7');
 * // []
 *
 * filterTree(menus, item=>item.id === 'not found');
 * // []
 */
function filterTree<T extends any, F extends (item: T) => boolean>(tree: T[], predicate: F, childrenField = 'children', nodeAssign: NodeAssign = 'spread') {
  const result: T[] = [];

  if (!isArray(tree)) {
    return result;
  }

  tree.forEach((item) => {
    let newItem = item;

    if (isObject(item)) {
      newItem = nodeAssign === 'spread' ? { ...item } : item;
    }

    if (predicate(newItem)) {
      if (isObject(newItem)) {
        // @ts-ignore
        const childs = newItem[childrenField] as T[];

        if (isArray(childs) && childs.length > 0) {
          // @ts-ignore
          newItem[childrenField] = filterTree(childs, predicate, childrenField, nodeAssign);
        }
      }

      result.push(newItem);
    }
  });

  return result;
}

export default filterTree;
