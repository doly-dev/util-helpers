import { forEach, isArray, isObject } from 'ut2';

/**
 * 查找树结构数据多个节点
 *
 * @static
 * @alias module:Tree.findTreeNodes
 * @since 4.15.0
 * @param {Object[]} tree 树结构数据
 * @param {function} predicate 遍历每一项执行的函数，参数是当前遍历到的节点数据，如果返回 Truthy ，返回结果将包含该节点
 * @param {string} [childrenField='children'] 子级字段名
 * @returns {Object[]}
 * @example
 * const menus = [{ id: '1', name: '首页', code: 'trade', pid: null }, { id: '2', name: '交易管理', code: 'trade', pid: null, children: [{ id: '3', name: '交易查询', code: 'trade-1', pid: '2', children: [{ id: '4', name: '交易查询-查询操作', code: 'trade-1-1', pid: '3' }]}]}, { id: '5', name: '权限管理', code: 'authorization', pid: null, children: [{ id: '6', name: '角色管理', code: 'authorization-1', pid: '5' }, { id: '7', name: '用户管理', code: 'authorization-2', pid: '5' }]}];
 *
 * findTreeNodes(menus, item=>item.id === '2');
 * // [{id:'2',name:'交易管理',code:'trade',pid:null,children:[{id:'3',name:'交易查询',code:'trade-1',pid:'2',children:[{id:'4',name:'交易查询-查询操作',code:'trade-1-1',pid:'3'}]}]}]
 *
 * findTreeNodes(menus, item=>item.name.indexOf('管理') > -1);
 * // [{id:'2',name:'交易管理',code:'trade',pid:null,children:[{id:'3',name:'交易查询',code:'trade-1',pid:'2',children:[{id:'4',name:'交易查询-查询操作',code:'trade-1-1',pid:'3'}]}]},{id:'5',name:'权限管理',code:'authorization',pid:null,children:[{id:'6',name:'角色管理',code:'authorization-1',pid:'5'},{id:'7',name:'用户管理',code:'authorization-2',pid:'5'}]},{id:'7',name:'用户管理',code:'authorization-2',pid:'5'},{id:'6',name:'角色管理',code:'authorization-1',pid:'5'}]
 *
 * findTreeNodes(menus, item=>item.id === '1' || item.id === '7');
 * // [{id:'1',name:'首页',code:'trade',pid:null},{id:'7',name:'用户管理',code:'authorization-2',pid:'5'}]
 *
 * findTreeNodes(menus, item=>item.id === 'not found');
 * // []
 */
function findTreeNodes<T extends any, F extends (item: T) => boolean>(tree: T[], predicate: F, childrenField = 'children') {
  const stack: T[] = [];

  const nodes: T[] = [];

  if (isArray(tree)) {
    forEach(tree, (item) => {
      stack.push(item);

      while (stack.length) {
        const temp = stack.pop() as T;
        if (predicate(temp)) {
          nodes.push(temp);
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
    });
  }

  return nodes;
}

export default findTreeNodes;
