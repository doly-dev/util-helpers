import { listToTree, transformFieldNames } from '../../src';

const menus = [
  { id: '1', name: '首页', code: 'trade', pid: null },
  { id: '2', name: '交易管理', code: 'trade', pid: null },
  { id: '3', name: '交易查询', code: 'trade-1', pid: '2' },
  { id: '4', name: '交易查询-查询操作', code: 'trade-1-1', pid: '3' },
  { id: '5', name: '交易查询-下载操作', code: 'trade-1-2', pid: '3' },
  { id: '6', name: '新增交易', code: 'trade-2', pid: '2' },
  { id: '7', name: '权限管理', code: 'authorization', pid: null },
  { id: '8', name: '角色管理', code: 'authorization-1', pid: '7' },
  { id: '9', name: '角色管理-查询操作', code: 'authorization-1-1', pid: '7' },
  { id: '10', name: '角色管理-新增/修改操作', code: 'authorization-1-2', pid: '7' },
  { id: '11', name: '角色管理-删除操作', code: 'authorization-1-3', pid: '7' },
  { id: '12', name: '用户管理', code: 'authorization-2', pid: '7' },
  { id: '13', name: '用户管理-查询操作', code: 'authorization-2-1', pid: '12' },
  { id: '14', name: '用户管理-新增/修改操作', code: 'authorization-2-2', pid: '12' },
  { id: '15', name: '用户管理-删除操作', code: 'authorization-2-3', pid: '12' },
];

describe('listToTree', () => {
  it('basic', () => {
    const basicMenus = [
      { id: '1', name: '首页', code: 'trade', pid: null },
      { id: '2', name: '交易管理', code: 'trade', pid: null },
      { id: '3', name: '交易查询', code: 'trade-1', pid: '2' },
      { id: '4', name: '交易查询-查询操作', code: 'trade-1-1', pid: '3' },
      { id: '5', name: '权限管理', code: 'authorization', pid: null },
      { id: '6', name: '角色管理', code: 'authorization-1', pid: '5' },
      { id: '7', name: '用户管理', code: 'authorization-2', pid: '5' }
    ];
    // console.log(JSON.stringify(listToTree(basicMenus)));
    expect(listToTree(basicMenus)).toMatchObject([{ "id": "1", "name": "首页", "code": "trade", "pid": null }, { "id": "2", "name": "交易管理", "code": "trade", "pid": null, "children": [{ "id": "3", "name": "交易查询", "code": "trade-1", "pid": "2", "children": [{ "id": "4", "name": "交易查询-查询操作", "code": "trade-1-1", "pid": "3" }] }] }, { "id": "5", "name": "权限管理", "code": "authorization", "pid": null, "children": [{ "id": "6", "name": "角色管理", "code": "authorization-1", "pid": "5" }, { "id": "7", "name": "用户管理", "code": "authorization-2", "pid": "5" }] }]);

    // console.log(JSON.stringify(listToTree(basicMenus, { childrenField: 'childs' })));
    expect(listToTree(basicMenus, { childrenField: 'childs' })).toMatchObject([{ "id": "1", "name": "首页", "code": "trade", "pid": null }, { "id": "2", "name": "交易管理", "code": "trade", "pid": null, "childs": [{ "id": "3", "name": "交易查询", "code": "trade-1", "pid": "2", "childs": [{ "id": "4", "name": "交易查询-查询操作", "code": "trade-1-1", "pid": "3" }] }] }, { "id": "5", "name": "权限管理", "code": "authorization", "pid": null, "childs": [{ "id": "6", "name": "角色管理", "code": "authorization-1", "pid": "5" }, { "id": "7", "name": "用户管理", "code": "authorization-2", "pid": "5" }] }]);
  });
  it('default', () => {
    // console.log(JSON.stringify(listToTree(menus)));
    expect(listToTree(menus)).toMatchObject([{ "id": "1", "name": "首页", "code": "trade", "pid": null }, { "id": "2", "name": "交易管理", "code": "trade", "pid": null, "children": [{ "id": "3", "name": "交易查询", "code": "trade-1", "pid": "2", "children": [{ "id": "4", "name": "交易查询-查询操作", "code": "trade-1-1", "pid": "3" }, { "id": "5", "name": "交易查询-下载操作", "code": "trade-1-2", "pid": "3" }] }, { "id": "6", "name": "新增交易", "code": "trade-2", "pid": "2" }] }, { "id": "7", "name": "权限管理", "code": "authorization", "pid": null, "children": [{ "id": "8", "name": "角色管理", "code": "authorization-1", "pid": "7" }, { "id": "9", "name": "角色管理-查询操作", "code": "authorization-1-1", "pid": "7" }, { "id": "10", "name": "角色管理-新增/修改操作", "code": "authorization-1-2", "pid": "7" }, { "id": "11", "name": "角色管理-删除操作", "code": "authorization-1-3", "pid": "7" }, { "id": "12", "name": "用户管理", "code": "authorization-2", "pid": "7", "children": [{ "id": "13", "name": "用户管理-查询操作", "code": "authorization-2-1", "pid": "12" }, { "id": "14", "name": "用户管理-新增/修改操作", "code": "authorization-2-2", "pid": "12" }, { "id": "15", "name": "用户管理-删除操作", "code": "authorization-2-3", "pid": "12" }] }] }]);
  });

  it('different empty children value', () => {
    expect(listToTree(menus, { emptyChildrenValue: 'array' })).toMatchObject([{ "id": "1", "name": "首页", "code": "trade", "pid": null, "children": [] }, { "id": "2", "name": "交易管理", "code": "trade", "pid": null, "children": [{ "id": "3", "name": "交易查询", "code": "trade-1", "pid": "2", "children": [{ "id": "4", "name": "交易查询-查询操作", "code": "trade-1-1", "pid": "3", "children": [] }, { "id": "5", "name": "交易查询-下载操作", "code": "trade-1-2", "pid": "3", "children": [] }] }, { "id": "6", "name": "新增交易", "code": "trade-2", "pid": "2", "children": [] }] }, { "id": "7", "name": "权限管理", "code": "authorization", "pid": null, "children": [{ "id": "8", "name": "角色管理", "code": "authorization-1", "pid": "7", "children": [] }, { "id": "9", "name": "角色管理-查询操作", "code": "authorization-1-1", "pid": "7", "children": [] }, { "id": "10", "name": "角色管理-新增/修改操作", "code": "authorization-1-2", "pid": "7", "children": [] }, { "id": "11", "name": "角色管理-删除操作", "code": "authorization-1-3", "pid": "7", "children": [] }, { "id": "12", "name": "用户管理", "code": "authorization-2", "pid": "7", "children": [{ "id": "13", "name": "用户管理-查询操作", "code": "authorization-2-1", "pid": "12", "children": [] }, { "id": "14", "name": "用户管理-新增/修改操作", "code": "authorization-2-2", "pid": "12", "children": [] }, { "id": "15", "name": "用户管理-删除操作", "code": "authorization-2-3", "pid": "12", "children": [] }] }] }]);
    expect(listToTree(menus, { emptyChildrenValue: 'null' })).toMatchObject([{ "id": "1", "name": "首页", "code": "trade", "pid": null, "children": null }, { "id": "2", "name": "交易管理", "code": "trade", "pid": null, "children": [{ "id": "3", "name": "交易查询", "code": "trade-1", "pid": "2", "children": [{ "id": "4", "name": "交易查询-查询操作", "code": "trade-1-1", "pid": "3", "children": null }, { "id": "5", "name": "交易查询-下载操作", "code": "trade-1-2", "pid": "3", "children": null }] }, { "id": "6", "name": "新增交易", "code": "trade-2", "pid": "2", "children": null }] }, { "id": "7", "name": "权限管理", "code": "authorization", "pid": null, "children": [{ "id": "8", "name": "角色管理", "code": "authorization-1", "pid": "7", "children": null }, { "id": "9", "name": "角色管理-查询操作", "code": "authorization-1-1", "pid": "7", "children": null }, { "id": "10", "name": "角色管理-新增/修改操作", "code": "authorization-1-2", "pid": "7", "children": null }, { "id": "11", "name": "角色管理-删除操作", "code": "authorization-1-3", "pid": "7", "children": null }, { "id": "12", "name": "用户管理", "code": "authorization-2", "pid": "7", "children": [{ "id": "13", "name": "用户管理-查询操作", "code": "authorization-2-1", "pid": "12", "children": null }, { "id": "14", "name": "用户管理-新增/修改操作", "code": "authorization-2-2", "pid": "12", "children": null }, { "id": "15", "name": "用户管理-删除操作", "code": "authorization-2-3", "pid": "12", "children": null }] }] }]);
  });

  it('custom field name', () => {
    expect(listToTree(menus, { childrenField: 'childs' })).toMatchObject([{ "id": "1", "name": "首页", "code": "trade", "pid": null }, { "id": "2", "name": "交易管理", "code": "trade", "pid": null, "childs": [{ "id": "3", "name": "交易查询", "code": "trade-1", "pid": "2", "childs": [{ "id": "4", "name": "交易查询-查询操作", "code": "trade-1-1", "pid": "3" }, { "id": "5", "name": "交易查询-下载操作", "code": "trade-1-2", "pid": "3" }] }, { "id": "6", "name": "新增交易", "code": "trade-2", "pid": "2" }] }, { "id": "7", "name": "权限管理", "code": "authorization", "pid": null, "childs": [{ "id": "8", "name": "角色管理", "code": "authorization-1", "pid": "7" }, { "id": "9", "name": "角色管理-查询操作", "code": "authorization-1-1", "pid": "7" }, { "id": "10", "name": "角色管理-新增/修改操作", "code": "authorization-1-2", "pid": "7" }, { "id": "11", "name": "角色管理-删除操作", "code": "authorization-1-3", "pid": "7" }, { "id": "12", "name": "用户管理", "code": "authorization-2", "pid": "7", "childs": [{ "id": "13", "name": "用户管理-查询操作", "code": "authorization-2-1", "pid": "12" }, { "id": "14", "name": "用户管理-新增/修改操作", "code": "authorization-2-2", "pid": "12" }, { "id": "15", "name": "用户管理-删除操作", "code": "authorization-2-3", "pid": "12" }] }] }]);

    const menus2 = transformFieldNames(menus, { currentId: 'id', parentId: 'pid' });
    expect(listToTree(menus2, { keyField: 'currentId', parentField: 'parentId', childrenField: 'childs' })).toMatchObject([{ "currentId": "1", "name": "首页", "code": "trade", "parentId": null }, { "currentId": "2", "name": "交易管理", "code": "trade", "parentId": null, "childs": [{ "currentId": "3", "name": "交易查询", "code": "trade-1", "parentId": "2", "childs": [{ "currentId": "4", "name": "交易查询-查询操作", "code": "trade-1-1", "parentId": "3" }, { "currentId": "5", "name": "交易查询-下载操作", "code": "trade-1-2", "parentId": "3" }] }, { "currentId": "6", "name": "新增交易", "code": "trade-2", "parentId": "2" }] }, { "currentId": "7", "name": "权限管理", "code": "authorization", "parentId": null, "childs": [{ "currentId": "8", "name": "角色管理", "code": "authorization-1", "parentId": "7" }, { "currentId": "9", "name": "角色管理-查询操作", "code": "authorization-1-1", "parentId": "7" }, { "currentId": "10", "name": "角色管理-新增/修改操作", "code": "authorization-1-2", "parentId": "7" }, { "currentId": "11", "name": "角色管理-删除操作", "code": "authorization-1-3", "parentId": "7" }, { "currentId": "12", "name": "用户管理", "code": "authorization-2", "parentId": "7", "childs": [{ "currentId": "13", "name": "用户管理-查询操作", "code": "authorization-2-1", "parentId": "12" }, { "currentId": "14", "name": "用户管理-新增/修改操作", "code": "authorization-2-2", "parentId": "12" }, { "currentId": "15", "name": "用户管理-删除操作", "code": "authorization-2-3", "parentId": "12" }] }] }]);

  });
});