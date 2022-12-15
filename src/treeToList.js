import { isObject } from "./utils/type";

/**
 * 树结构转列表数据
 * 
 * @static
 * @alias module:Processor.treeToList
 * @since 4.14.0
 * @template {Record<string,any>} T
 * @template {keyof T} K
 * @template {Omit<T, K>} R
 * @param {T[]} tree 列表数据
 * @param {K} childrenField 子级字段名称
 * @returns {R[]} 列表数据
 * @example
 * const menus = [{ "id": "1", "name": "首页", "code": "trade", "pid": null }, { "id": "2", "name": "交易管理", "code": "trade", "pid": null, "children": [{ "id": "3", "name": "交易查询", "code": "trade-1", "pid": "2", "children": [{ "id": "4", "name": "交易查询-查询操作", "code": "trade-1-1", "pid": "3" }] }] }, { "id": "5", "name": "权限管理", "code": "authorization", "pid": null, "children": [{ "id": "6", "name": "角色管理", "code": "authorization-1", "pid": "5" }, { "id": "7", "name": "用户管理", "code": "authorization-2", "pid": "5" }] }];
 * 
 * treeToList(menus, 'children'));
 * // [{"id":"1","name":"首页","code":"trade","pid":null},{"id":"2","name":"交易管理","code":"trade","pid":null},{"id":"3","name":"交易查询","code":"trade-1","pid":"2"},{"id":"4","name":"交易查询-查询操作","code":"trade-1-1","pid":"3"},{"id":"5","name":"权限管理","code":"authorization","pid":null},{"id":"6","name":"角色管理","code":"authorization-1","pid":"5"},{"id":"7","name":"用户管理","code":"authorization-2","pid":"5"}]
 */
function treeToList(tree, childrenField) {
  /** @type {R[]} */
  const list = [];

  /**
   * 递归遍历
   * @param {T[]} arr 列表数据
   */
  function recusion(arr) {
    arr.forEach(item => {
      if (isObject(item)) {
        const newItem = { ...item };
        // @ts-ignore
        list.push(newItem);

        if (newItem?.[childrenField]) {
          if (Array.isArray(newItem[childrenField]) && newItem[childrenField].length > 0) {
            recusion(newItem[childrenField]);
          }
          delete newItem[childrenField];
        }
      } else {
        // @ts-ignore
        list.push(item);
      }
    });
  }

  recusion(tree);
  return list;
}

export default treeToList;