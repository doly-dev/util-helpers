import { isObject } from "./utils/type";

/**
 * 列表数据转树结构
 * 
 * @static
 * @alias module:Processor.listToTree
 * @since 4.14.0
 * @template {Object.<string,any>} [T=Object.<string,any>]
 * @template {*} [R=T&Object.<string,any>]
 * @param {T[]} list 列表数据
 * @param {object} options 配置项
 * @param {string} [options.keyField='id'] 键值字段名称
 * @param {string} [options.parentField='pid'] 父级字段名称
 * @param {string} [options.childrenField='children'] 子级字段名称
 * @param {'none'|'null'|'array'} [options.emptyChildrenValue='none'] 子级为空时的值，none表示删除该子级，null表示为null，array表示为[]。
 * @returns {R[]}
 */
function listToTree(list, options = {}) {
  const { keyField = 'id', parentField = 'pid', childrenField = 'children', emptyChildrenValue = 'none' } = options;

  /** @type {R[]} */
  const tree = [];

  /** @type {Object.<string, T[]>} */
  const record = {};

  list.forEach(item => {
    if (isObject(item)) {
      /** @type {string} */
      const id = item[keyField];

      /** @type {string} */
      const pid = item[parentField];

      if (record[id]) {
        // @ts-ignore
        item[childrenField] = record[id];
      } else {
        // @ts-ignore
        item[childrenField] = record[id] = [];
      }

      if (pid) {
        if (!record[pid]) {
          record[pid] = [item];
        } else {
          record[pid].push(item);
        }
      } else {
        // @ts-ignore
        tree.push(item);
      }
    }
  });

  if (emptyChildrenValue !== 'array') {
    list.forEach(item => {
      if (Array.isArray(item[childrenField]) && item[childrenField].length <= 0) {
        if (emptyChildrenValue === 'null') {
          // @ts-ignore
          item[childrenField] = null;
        } else if (emptyChildrenValue === 'none') {
          delete item[childrenField];
        }
      }
    });
  }

  return tree;
}

export default listToTree;