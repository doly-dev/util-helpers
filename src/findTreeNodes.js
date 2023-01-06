import { isObject } from "./utils/type";

/**
 * 查找树结构数据多个节点
 * 
 * @static
 * @alias module:Other.findTreeNodes
 * @since 4.15.0
 * @template {any} T
 * @template {(item: T) => boolean} F
 * @param {T[]} tree 树结构数据
 * @param {F} predicate 遍历每一项执行的函数，参数是当前遍历到的节点数据，如果返回 Truthy ，返回结果将包含该节点
 * @param {string} [childrenField='children'] 子级字段名
 * @returns {T[]}
 * @example
 * const menus = [{ "id": "1", "name": "首页", "code": "trade", "pid": null }, { "id": "2", "name": "交易管理", "code": "trade", "pid": null, "children": [{ "id": "3", "name": "交易查询", "code": "trade-1", "pid": "2", "children": [{ "id": "4", "name": "交易查询-查询操作", "code": "trade-1-1", "pid": "3" }] }] }, { "id": "5", "name": "权限管理", "code": "authorization", "pid": null, "children": [{ "id": "6", "name": "角色管理", "code": "authorization-1", "pid": "5" }, { "id": "7", "name": "用户管理", "code": "authorization-2", "pid": "5" }] }];
 * 
 * findTreeNodes(menus, item=>item.id === '2');
 * // [{"id":"2","name":"交易管理","code":"trade","pid":null,"children":[{"id":"3","name":"交易查询","code":"trade-1","pid":"2","children":[{"id":"4","name":"交易查询-查询操作","code":"trade-1-1","pid":"3"}]}]}]
 * 
 * findTreeNodes(menus, item=>item.name.indexOf('管理') > -1);
 * // [{"id":"2","name":"交易管理","code":"trade","pid":null,"children":[{"id":"3","name":"交易查询","code":"trade-1","pid":"2","children":[{"id":"4","name":"交易查询-查询操作","code":"trade-1-1","pid":"3"}]}]},{"id":"5","name":"权限管理","code":"authorization","pid":null,"children":[{"id":"6","name":"角色管理","code":"authorization-1","pid":"5"},{"id":"7","name":"用户管理","code":"authorization-2","pid":"5"}]},{"id":"7","name":"用户管理","code":"authorization-2","pid":"5"},{"id":"6","name":"角色管理","code":"authorization-1","pid":"5"}]
 * 
 * findTreeNodes(menus, item=>item.id === '1' || item.id === '7');
 * // [{"id":"1","name":"首页","code":"trade","pid":null},{"id":"7","name":"用户管理","code":"authorization-2","pid":"5"}]
 * 
 * findTreeNodes(menus, item=>item.id === 'not found');
 * // []
 */
function findTreeNodes(tree, predicate, childrenField = 'children') {
  const stack = [];

  /** @type {T[]} */
  let nodes = [];

  if (!Array.isArray(tree)) {
    return nodes;
  }

  for (const item of tree) {
    stack.push(item);

    while (stack.length) {
      /** @type {T} */
      // @ts-ignore
      const temp = stack.pop();
      if (predicate(temp)) {
        nodes.push(temp);
      }

      if (isObject(temp)) {
        /** @type {T[]} */
        // @ts-ignore
        const childs = temp[childrenField];
        if (Array.isArray(childs) && childs.length > 0) {
          stack.push(...childs);
        }
      }
    }
  }

  return nodes;
}

export default findTreeNodes;