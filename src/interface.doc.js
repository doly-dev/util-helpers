/* eslint-disable no-unused-vars */
// 该文件用于 jsdoc 生成文件。因为一些 typescript 语法， jsdoc 不支持，导致生成文档报错。

/**
 * 转换字段名，返回一个转换字段后的值，不改变原值。
 * 
 * @static
 * @alias module:Tree.transformFieldNames
 * @since 4.14.0
 * @param {object[]} data 对象数组。如果是树结构数据，需要指定第三个参数 childrenField
 * @param {object} fieldNames 字段名映射
 * @param {string} [childrenField] 子级数据字段名
 * @param {'spread'|'self'} [nodeAssign='spread'] 节点赋值方式。spread表示使用展开运算符创建新值，self表示使用自身对象。
 * @returns {object[]}
 * @example
 * 
 * const options = [{code: '1', name: 'one'},{code:'2', name:'two'}];
 * const newOptions = transformFieldNames(options, {label: 'name', value: 'code'});
 * // [{value: '1', label: 'one'},{value:'2', label:'two'}]
 * 
 * // 嵌套数据，指定子级字段名 children
 * const options2 = [{code: '1', name: 'one'},{code:'2', name:'two', children: [{code:'2-1', name:'two-one', children: [{code: '2-1-1', name:'two-one-one'}]}]}];
 * const newOptions2 = transformFieldNames(options2, {label: 'name', value: 'code'}, 'children');
 * // [{value: '1', label: 'one'},{value:'2', label:'two', children: [{value: '2-1', label:'two-one', children: [{value: '2-1-1', label:'two-one-one'}]}]}]
 * 
 * const options3 = [{code: '1', name: 'one'},{code:'2', name:'two', childs: [{code:'2-1', name:'two-one'}]}];
 * const newOptions3 = transformFieldNames(options3, {label: 'name', value: 'code'}, 'childs');
 * // [{value: '1', label: 'one'},{value:'2', label:'two', childs: [{value: '2-1', label:'two-one'}]}]
 * 
 * // 嵌套数据，并替换子集字段名
 * const newOptions4 = transformFieldNames(options3, {label: 'name', value: 'code', children: 'childs'}, 'childs');
 * // [{value: '1', label: 'one'},{value:'2', label:'two', children: [{value: '2-1', label:'two-one'}]}]
 */
function transformFieldNames(data, fieldNames, childrenField) { }