/**
 * 查找树结构数据节点
 * 
 * @static
 * @alias module:Other.findTreeNode
 * @since 4.14.0
 * @template {any} T
 * @template {(item: T) => boolean} F
 * @param {T[]} tree 树结构数据
 * @param {F} predicate 遍历每一项执行的函数，参数是当前遍历到的节点数据，如果返回 Truthy 将返回该节点
 * @param {string} [childrenField='children'] 子级字段名
 * @returns {T|undefined}
 * @example
 * const menus = [{ "id": "1", "name": "首页", "code": "trade", "pid": null }, { "id": "2", "name": "交易管理", "code": "trade", "pid": null, "children": [{ "id": "3", "name": "交易查询", "code": "trade-1", "pid": "2", "children": [{ "id": "4", "name": "交易查询-查询操作", "code": "trade-1-1", "pid": "3" }] }] }, { "id": "5", "name": "权限管理", "code": "authorization", "pid": null, "children": [{ "id": "6", "name": "角色管理", "code": "authorization-1", "pid": "5" }, { "id": "7", "name": "用户管理", "code": "authorization-2", "pid": "5" }] }];
 * 
 * findTreeNode(menus, item=>item.id === '2');
 * // {"id":"2","name":"交易管理","code":"trade","pid":null,"children":[{"id":"3","name":"交易查询","code":"trade-1","pid":"2","children":[{"id":"4","name":"交易查询-查询操作","code":"trade-1-1","pid":"3"}]}]}
 * 
 * findTreeNode(menus, item=>item.id === '7');
 * // {"id":"7","name":"用户管理","code":"authorization-2","pid":"5"}
 * 
 * findTreeNode(menus, item=>item.id === 'not found');
 * // undefined
 */
function findTreeNode(tree, predicate, childrenField = 'children') {
  const stack = [];

  /** @type {T|undefined} */
  let node;

  for (const item of tree) {
    stack.push(item);

    while (stack.length) {
      /** @type {T} */
      // @ts-ignore
      const temp = stack.pop();
      if (predicate(temp)) {
        node = temp;
        break;
      }

      /** @type {T[]} */
      // @ts-ignore
      const children = temp[childrenField] || [];
      stack.push(...children);
    }

    if (node) {
      break;
    }
  }

  return node;
}

export default findTreeNode;