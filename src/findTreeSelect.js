import { isObject } from "./utils/type";

/**
 * 内部实现
 * 
 * @private
 * @template {any} T
 * @template {(item: T) => boolean} F
 * @param {T[]} tree 树结构数据
 * @param {F} predicate 遍历每一项执行的函数，参数是当前遍历到的节点数据，如果返回 Truthy 将返回包含该节点的所有父级节点
 * @param {string} [childrenField='children'] 子级字段名
 * @param {T[]} [path=[]] 当前遍历路径
 * @returns {T[]}
 */
function internalFindTreeSelect(tree, predicate, childrenField = 'children', path = []) {
  if (!tree) {
    return [];
  }

  for (const item of tree) {
    path.push(item);

    if (predicate(item)) {
      return path;
    }

    if (isObject(item)) {
      /** @type {T[]} */
      // @ts-ignore
      const childs = item[childrenField];

      if (Array.isArray(childs) && childs.length > 0) {
        const findChildren = internalFindTreeSelect(childs, predicate, childrenField, path);
        if (findChildren.length > 0) {
          return findChildren;
        }
      }
    }

    path.pop();
  }

  return [];
}

/**
 * 查找包含当前节点的所有父级节点
 * 
 * @static
 * @alias module:Other.findTreeSelect
 * @since 4.14.0
 * @template {any} T
 * @template {(item: T) => boolean} F
 * @param {T[]} tree 树结构数据
 * @param {F} predicate 遍历每一项执行的函数，参数是当前遍历到的节点数据，如果返回 Truthy 将返回包含该节点的所有父级节点
 * @param {string} [childrenField='children'] 子级字段名
 * @returns {T[]}
 * @example
 * const menus = [{ "id": "1", "name": "首页", "code": "trade", "pid": null }, { "id": "2", "name": "交易管理", "code": "trade", "pid": null, "children": [{ "id": "3", "name": "交易查询", "code": "trade-1", "pid": "2", "children": [{ "id": "4", "name": "交易查询-查询操作", "code": "trade-1-1", "pid": "3" }] }] }, { "id": "5", "name": "权限管理", "code": "authorization", "pid": null, "children": [{ "id": "6", "name": "角色管理", "code": "authorization-1", "pid": "5" }, { "id": "7", "name": "用户管理", "code": "authorization-2", "pid": "5" }] }];
 * 
 * findTreeSelect(menus, item => item.id === '2');
 * // [{"id":"2","name":"交易管理","code":"trade","pid":null,"children":[{"id":"3","name":"交易查询","code":"trade-1","pid":"2","children":[{"id":"4","name":"交易查询-查询操作","code":"trade-1-1","pid":"3"}]}]}]
 * 
 * findTreeSelect(menus, item => item.id === '7');
 * // [{"id":"5","name":"权限管理","code":"authorization","pid":null,"children":[{"id":"6","name":"角色管理","code":"authorization-1","pid":"5"},{"id":"7","name":"用户管理","code":"authorization-2","pid":"5"}]},{"id":"7","name":"用户管理","code":"authorization-2","pid":"5"}]
 * 
 * findTreeSelect(menus, item => item.id === 'not found');
 * // []
 */
function findTreeSelect(tree, predicate, childrenField = 'children') {
  return internalFindTreeSelect(tree, predicate, childrenField);
}

export default findTreeSelect;